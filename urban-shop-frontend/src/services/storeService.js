const STORAGE_KEYS = {
  users: "urbanshop_users",
  products: "urbanshop_products",
  orders: "urbanshop_orders",
  cart: "urbanshop_cart",
  currentUser: "urbanshop_current_user",
};

const defaultProducts = [
  { id: "prod-1", nombre: "Camiseta Urban Classic", descripcion: "Algodón 100% premium", precio: 89900, imagen_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80", stock: 25, categoria: "hombres" },
  { id: "prod-2", nombre: "Jeans Slim Fit", descripcion: "Denim elástico cómodo", precio: 129900, imagen_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80", stock: 18, categoria: "hombres" },
  { id: "prod-3", nombre: "Vestido Floral", descripcion: "Tela ligera de verano", precio: 109900, imagen_url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=500&q=80", stock: 14, categoria: "mujeres" },
];

const read = (key, fallback) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const initializeStore = () => {
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    write(STORAGE_KEYS.products, defaultProducts);
  }
  if (!localStorage.getItem(STORAGE_KEYS.users)) write(STORAGE_KEYS.users, []);
  if (!localStorage.getItem(STORAGE_KEYS.orders)) write(STORAGE_KEYS.orders, []);
  if (!localStorage.getItem(STORAGE_KEYS.cart)) write(STORAGE_KEYS.cart, []);
};

export const getProducts = () => read(STORAGE_KEYS.products, []);
export const saveProducts = (products) => write(STORAGE_KEYS.products, products);

export const registerUser = (user) => {
  const users = read(STORAGE_KEYS.users, []);
  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    return { ok: false, message: "Este correo ya está registrado." };
  }
  users.push({ ...user, id: crypto.randomUUID() });
  write(STORAGE_KEYS.users, users);
  return { ok: true };
};

export const loginUser = (email, password) => {
  const users = read(STORAGE_KEYS.users, []);
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, message: "Credenciales inválidas." };
  write(STORAGE_KEYS.currentUser, user);
  return { ok: true, user };
};

export const getCurrentUser = () => read(STORAGE_KEYS.currentUser, null);
export const logoutUser = () => localStorage.removeItem(STORAGE_KEYS.currentUser);

export const getCart = () => read(STORAGE_KEYS.cart, []);
export const addToCart = (productId, quantity = 1) => {
  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  write(STORAGE_KEYS.cart, cart);
};

export const clearCart = () => write(STORAGE_KEYS.cart, []);

export const placeOrder = () => {
  const user = getCurrentUser();
  const cart = getCart();
  const products = getProducts();
  if (!user) return { ok: false, message: "Debes iniciar sesión para hacer pedidos." };
  if (!cart.length) return { ok: false, message: "No hay productos en el carrito." };

  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, nombre: product?.nombre || "Producto", precio: product?.precio || 0 };
  });

  const total = items.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  const orders = read(STORAGE_KEYS.orders, []);
  orders.push({ id: crypto.randomUUID(), userEmail: user.email, fecha: new Date().toISOString(), items, total });
  write(STORAGE_KEYS.orders, orders);
  clearCart();
  return { ok: true };
};

export const getOrders = () => read(STORAGE_KEYS.orders, []);
export const getUsers = () => read(STORAGE_KEYS.users, []);

export const getSystemInfo = () => ({
  usuarios: getUsers().length,
  productos: getProducts().length,
  pedidos: getOrders().length,
  usuarioActivo: getCurrentUser()?.email || "Sin sesión",
});
