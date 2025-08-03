// urban_shop/assets/js/index.js

// 1. Configuración
const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const toggleBtn = document.getElementById("toggle-menu");
const mobileMenu = document.getElementById("mobile-menu");

// 2. Datos de productos de ejemplo (temporales)
const sampleProducts = [
  {
    id: 'prod-1',
    name: 'Camiseta Urban Classic',
    description: 'Algodón 100% premium',
    price: 89900,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'hombres'
  },
  {
    id: 'prod-2',
    name: 'Jeans Slim Fit',
    description: 'Denim elástico cómodo',
    price: 129900,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'hombres'
  },
  {
    id: 'prod-3',
    name: 'Vestido Floral',
    description: 'Tela ligera de verano',
    price: 109900,
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'mujeres'
  },
  {
    id: 'prod-4',
    name: 'Zapatos Urbanos',
    description: 'Estilo moderno y cómodo',
    price: 159900,
    imageUrl: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'unisex'
  },
  {
    id: 'prod-5',
    name: 'Gorra Streetwear',
    description: 'Ajustable y transpirable',
    price: 49900,
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'unisex'
  }
];

// 3. Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(sampleProducts);
  setupEventListeners();
});

// 4. Renderizado de productos
function renderProducts(products) {
  if (!carousel) return;
  
  carousel.innerHTML = '';
  
  products.forEach(product => {
    const productCard = createProductCard(product);
    carousel.appendChild(productCard);
  });
}

function createProductCard(product) {
  const item = document.createElement("div");
  item.className = "min-w-[250px] max-w-xs bg-gray-100 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 snap-start mx-2";
  item.dataset.productId = product.id;
  
  item.innerHTML = `
    <img src="${product.imageUrl}" 
         alt="${product.name}" 
         class="w-full h-[300px] object-cover"
         loading="lazy">
    <div class="p-4 space-y-2">
      <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
      <p class="text-sm text-gray-600">${product.description}</p>
      <p class="text-md font-bold text-green-600">$${product.price.toLocaleString('es-CO')} COP</p>
      <div class="flex items-center space-x-2">
        <label for="cantidad" class="text-sm">Cantidad:</label>
        <input type="number" 
               value="1" 
               min="1" 
               class="w-16 px-2 py-1 border rounded-md text-sm focus:outline-none" />
      </div>
      <button class="add-to-cart mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 text-sm">
        Agregar al carrito
      </button>
    </div>`;
  
  return item;
}

// 5. Event Listeners
function setupEventListeners() {
  // Carrusel
  if (prevBtn) prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  });
  
  if (nextBtn) nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  });
  
  // Menú móvil
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
  
  // Botones "Agregar al carrito"
  if (carousel) {
    carousel.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('[data-product-id]');
        const productId = card.dataset.productId;
        const quantity = parseInt(card.querySelector('input').value) || 1;
        
        // Aquí puedes integrar con CartService
        console.log(`Agregando producto ${productId}, cantidad: ${quantity}`);
        showToast('Producto agregado al carrito');
      }
    });
  }
}

// 6. Mostrar notificación
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 7. Añadir estilos para el toast
const style = document.createElement('style');
style.textContent = `
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
  .opacity-0 { opacity: 0; }
`;
document.head.appendChild(style);