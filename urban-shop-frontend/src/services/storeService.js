const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const STORAGE_KEYS = {
  cart: 'urbanshop_cart',
  currentUser: 'urbanshop_current_user',
};

const read = (key, fallback) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Error de conexión con el servidor');
  return data;
};

const getAuthHeaders = () => {
  const user = getCurrentUser();
  return user?.rol ? { 'x-user-role': user.rol } : {};
};

export const initializeStore = () => {
  if (!localStorage.getItem(STORAGE_KEYS.cart)) write(STORAGE_KEYS.cart, []);
};

export const getProducts = () => apiRequest('/productos');

export const createProduct = (product) => apiRequest('/productos', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(product) });

export const updateProduct = (id, product) => apiRequest(`/productos/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(product) });

export const deleteProductById = (id) => apiRequest(`/productos/${id}`, { method: 'DELETE', headers: getAuthHeaders() });

export const registerUser = async (user) => {
  await apiRequest('/usuarios/registro', { method: 'POST', body: JSON.stringify(user) });
  return { ok: true };
};

export const loginUser = async (email, password) => {
  const data = await apiRequest('/usuarios/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  write(STORAGE_KEYS.currentUser, data.user);
  return { ok: true, user: data.user };
};

export const getCurrentUser = () => read(STORAGE_KEYS.currentUser, null);

export const getCart = () => read(STORAGE_KEYS.cart, []);

export const addToCart = (productId, quantity = 1) => {
  const cart = getCart();
  const existing = cart.find((i) => i.productId === productId);
  if (existing) existing.quantity += quantity;
  else cart.push({ productId, quantity });
  write(STORAGE_KEYS.cart, cart);
};

export const clearCart = () => write(STORAGE_KEYS.cart, []);

export const placeOrder = async () => {
  const user = getCurrentUser();
  const cart = getCart();
  if (!user) return { ok: false, message: 'Debes iniciar sesión para hacer pedidos.' };
  if (!cart.length) return { ok: false, message: 'No hay productos en el carrito.' };

  try {
    await apiRequest('/pedidos', {
      method: 'POST',
      body: JSON.stringify({ userEmail: user.email, items: cart }),
    });
    clearCart();
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export const getOrders = () => apiRequest('/pedidos');

export const getUsers = () => apiRequest('/usuarios');

export const getSystemInfo = async () => {
  const info = await apiRequest('/sistema/info');
  return {
    ...info,
    usuarioActivo: getCurrentUser()?.email || 'Sin sesión',
  };
};