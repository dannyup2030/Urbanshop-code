const accessKey = "mp7S8o1e6V3Nexje8Lgvc7gqzFKLond0Ao2BcPwVTF4";
const carousel = document.getElementById("carousel");
const searchQuery = "urban fashion clothing";

async function fetchImages() {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10&client_id=${accessKey}`);
    const data = await response.json();
    const images = data.results;

    const price = (Math.floor(Math.random() * 100000) + 50000).toLocaleString('es-CO');
    // Limpia el carrusel
    carousel.innerHTML = "";

    // Crea cada tarjeta con imagen y detalles
    images.forEach((img) => {
      const item = document.createElement("div");
      item.className = "min-w-[250px] max-w-xs bg-gray-100 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 snap-start";
      item.innerHTML = `
        <img src="${img.urls.regular}" alt="${img.alt_description}" class="w-full h-[300px] object-cover" />
         <div class="p-4 space-y-2">
      <h3 class="text-lg font-semibold text-gray-800">Producto Urban</h3>
      <p class="text-sm text-gray-600">Moda callejera moderna</p>
      <p class="text-md font-bold text-green-600">$${price} COP</p>

      <div class="flex items-center space-x-2">
        <label for="cantidad" class="text-sm">Cantidad:</label>
        <input type="number" value="1" min="1" class="w-16 px-2 py-1 border rounded-md text-sm focus:outline-none" />
      </div>
      <button class="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 text-sm">
        Agregar al carrito
      </button>
    </div>`;

      carousel.appendChild(item);
    });
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
  }
}

fetchImages();

// Navegación del carrusel
document.getElementById("next").addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});

document.getElementById("prev").addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});




const toggleBtn = document.getElementById("toggle-menu");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});




