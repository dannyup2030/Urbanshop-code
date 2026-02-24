import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { loginUser } from "../services/storeService";

export default function Sesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const result = loginUser(email, password);
    setMessage(result.ok ? `Sesión iniciada: ${result.user.nombre}` : result.message);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6 mt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
          {message && <p className="mb-4 text-center text-sm">{message}</p>}
          <form className="space-y-4" onSubmit={onSubmit}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded-md" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Contraseña" className="w-full p-2 border rounded-md" />
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700 transition">Ingresar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
