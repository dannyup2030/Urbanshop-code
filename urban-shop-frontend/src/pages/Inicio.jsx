import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Productos from '../components/Productos.jsx';
import { addToCart, getProducts, initializeStore } from '../services/storeService';

export default function Inicio() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      initializeStore();
      try {
        setProducts(await getProducts());
      } catch (error) {
        setMessage(error.message);
      }
    };
    load();
  }, []);

  const scroll = (direction) => {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft += direction === 'left' ? -300 : 300;
  };

  const handleAddToCart = (id, quantity) => {
    addToCart(id, quantity);
    setMessage('Producto agregado al carrito.');
    setTimeout(() => setMessage(''), 1800);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <section className="relative w-full h-[30rem] mt-16">
        <img src="/img/Logo Urban shop.png" alt="urbanShop" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold drop-shadow-lg uppercase">Bienvenido a Urban Shop</h1>
        </div>
      </section>

      <section className="relative my-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nuestros Productos</h2>
        {message && <p className="text-center text-green-700 mb-4">{message}</p>}
        <div className="relative max-w-7xl mx-auto">
          <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full">&#8592;</button>
          <Productos products={products} onAddToCart={handleAddToCart} />
          <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full">&#8594;</button>
        </div>
      </section>

      <footer className="bg-black text-center text-white p-4 mt-auto">&copy; 2025 Urban Shop - Danny Urrea.</footer>
    </div>
  );
}
