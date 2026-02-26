import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { registerUser } from '../services/storeService';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', celular: '', cedula: '', fechaNacimiento: '', password: '' });
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMessage('Usuario registrado correctamente.');
      setForm({ nombre: '', email: '', celular: '', cedula: '', fechaNacimiento: '', password: '' });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

<main className="flex-grow flex items-center justify-center p-6 mt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Registro</h2>
{message && <p className="mb-4 text-center text-sm">{message}</p>}
          <form className="space-y-4" onSubmit={onSubmit}>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required type="text" placeholder="Nombre completo" className="w-full p-2 border rounded-md" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded-md" />
            <input value={form.celular} onChange={(e) => setForm({ ...form, celular: e.target.value })} required type="text" placeholder="Celular" className="w-full p-2 border rounded-md" />
            <input value={form.cedula} onChange={(e) => setForm({ ...form, cedula: e.target.value })} required type="text" placeholder="Cédula" className="w-full p-2 border rounded-md" />
            <input value={form.fechaNacimiento} onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })} required type="date" className="w-full p-2 border rounded-md" />
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required type="password" placeholder="Contraseña" className="w-full p-2 border rounded-md" />
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700 transition">Registrar</button>
          </form>
        </div>
      </main>

</div>
  );
}


