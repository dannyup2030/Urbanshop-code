// src/pages/Registro.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function Registro() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 mt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Registro</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Nombre completo" className="w-full p-2 border rounded-md" />
            <input type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded-md" />
            <input type="text" placeholder="Celular" className="w-full p-2 border rounded-md" />
            <input type="text" placeholder="Cédula" className="w-full p-2 border rounded-md" />
            <input type="date" placeholder="Fecha de nacimiento" className="w-full p-2 border rounded-md" />
            <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded-md" />
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700 transition">
              Registrar
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-black text-center text-white p-4">
        &copy; 2025 Urban Shop - Danny Urrea. Todos los derechos reservados.
      </footer>
    </div>
  );
}
