// src/pages/Inicio.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx";
import Productos from "../components/Productos.jsx";

export default function Inicio() {
  const scroll = (direction) => {
    const carousel = document.getElementById("carousel");
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[30rem] mt-16">
        <img
          src="./img/Logo Urban shop.png"
          alt="urbanShop"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold drop-shadow-lg uppercase">
            Bienvenido a Urban Shop
          </h1>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto my-12 px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="#" className="group relative overflow-hidden rounded-xl shadow-lg">
            <img
              src="/img/Rey.png"
              alt="Hombres"
              className="w-full h-[400px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold uppercase drop-shadow-md">Hombres</h2>
            </div>
          </a>
          <a href="#" className="group relative overflow-hidden rounded-xl shadow-lg">
            <img
              src="/img/accesorios.png"
              alt="Accesorios"
              className="w-full h-[400px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold uppercase drop-shadow-md">Accesorios</h2>
            </div>
          </a>
          <a href="#" className="group relative overflow-hidden rounded-xl shadow-lg">
            <img
              src="/img/reyna.png"
              alt="Mujeres"
              className="w-full h-[400px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold uppercase drop-shadow-md">Mujeres</h2>
            </div>
          </a>
        </div>
      </section>


      {/* Productos */}
      <section className="relative">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Nuestros Productos</h2>
        <div class="relative max-w-7xl mx-auto">
          {/* Botón izquierda */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full"
          >
            &#8592;
          </button>

          {/* Carrusel productos */}
          <Productos />

          {/* Botón derecha */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>
      </section>


      <footer className="bg-black text-center text-white p-4">
        &copy; 2025 Urban Shop - Danny Urrea. Todos los derechos reservados.
      </footer>
    </div>
  );
}
