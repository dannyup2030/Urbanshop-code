// src/pages/Recuperar.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function Recuperar() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 mt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Recuperar Contraseña</h2>
          <form className="space-y-4">
            <input type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded-md" />
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700 transition">
              Enviar enlace de recuperación
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
