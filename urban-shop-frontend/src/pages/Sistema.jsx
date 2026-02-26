import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getSystemInfo } from '../services/storeService';

export default function Sistema() {
  const [info, setInfo] = useState({ usuarios: 0, productos: 0, pedidos: 0, usuarioActivo: 'Sin sesión' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setInfo(await getSystemInfo());
      } catch (error) {
        setMessage(error.message);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="pt-24 max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Información del sistema</h1>
        {message && <p className="mb-3">{message}</p>}
        <div className="bg-white rounded shadow p-4 space-y-2">
          <p>Usuarios registrados: <strong>{info.usuarios}</strong></p>
          <p>Productos disponibles: <strong>{info.productos}</strong></p>
          <p>Pedidos realizados: <strong>{info.pedidos}</strong></p>
          <p>Usuario activo: <strong>{info.usuarioActivo}</strong></p>
        </div>
      </main>
    </div>
  );
}