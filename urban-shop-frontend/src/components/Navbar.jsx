import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
return (
    <nav className="bg-black text-white fixed w-full z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">Urban Shop</Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white focus:outline-none" aria-label="Abrir menú">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">

       <Link className="hover:text-blue-300" to="/">Inicio</Link>
          <Link className="hover:text-blue-300" to="/registro">Registrarse</Link>
          <Link className="hover:text-blue-300" to="/sesion">Iniciar Sesión</Link>
          <Link className="hover:text-blue-300" to="/gestion-productos">Gestionar Productos</Link>
          <Link className="hover:text-blue-300" to="/sistema">Sistema</Link>
          <Link className="hover:text-blue-300" to="/pedidos"><svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#ffffff"
  stroke-width="1.25"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
  <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
</svg></Link>
        </div>
      </div>

      {mobileOpen && (
<div className="flex flex-col space-y-2 bg-black text-white px-4 py-4 rounded-b-lg shadow-lg md:hidden">
          <Link className="block hover:text-blue-300" to="/">Inicio</Link>
          <Link className="block hover:text-blue-300" to="/registro">Registrarse</Link>
          <Link className="block hover:text-blue-300" to="/sesion">Iniciar Sesión</Link>
          <Link className="block hover:text-blue-300" to="/gestion-productos">Gestionar Productos</Link>
          <Link className="block hover:text-blue-300" to="/pedidos"><svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#ffffff"
  stroke-width="1.25"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
  <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
</svg></Link>
          <Link className="block hover:text-blue-300" to="/sistema">Sistema</Link>
        </div>
      )}
    </nav>
  );
}