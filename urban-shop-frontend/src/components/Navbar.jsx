import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="bg-black text-white fixed w-full z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">Urban Shop</Link>
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">
          <Link className=" hover:text-blue-300" to="/">Inicio</Link>
          <Link className=" hover:text-blue-300" to="/hombres">Productos</Link>
          <Link className=" hover:text-blue-300" to="/mujeres">Iniciar Sesión</Link>
          <Link className=" hover:text-blue-300 font-semibold underline" to="/accesorios">Registrarse</Link>
          <Link className=" hover:text-blue-300" to="/accesorios">Carrito</Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hiddenflex-col space-y-2 bg-black text-white px-4 py-4 rounded-b-lg shadow-lg md:hidden">
          <Link className="block hover:text-blue-300" to="/">Inicio</Link>
          <Link className="block hover:text-blue-300" to="/hombres">Productos</Link>
          <Link className="block hover:text-blue-300" to="/mujeres">Iniciar Sesión</Link>
          <Link className="block hover:text-blue-300 font-semibold underline" to="/accesorios">Registrarse</Link>
          <Link className="block hover:text-blue-300" to="/accesorios">Carrito</Link>
        </div>
      )}
    </nav>
  );
}
