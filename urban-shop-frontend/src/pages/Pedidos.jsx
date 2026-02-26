import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { getCart, getProducts, placeOrder } from '../services/storeService';

export default function Pedidos() {
  const [message, setMessage] = useState('');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      setCart(getCart());
      try {
        setProducts(await getProducts());
      } catch (error) {
        setMessage(error.message);
      }
    };
    load();
  }, []);

  const details = useMemo(() => cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, nombre: product?.nombre || 'Producto', precio: Number(product?.precio || 0) };
  }), [cart, products]);

  const total = details.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  const confirmOrder = async () => {
    const result = await placeOrder();
    setMessage(result.ok ? 'Pedido realizado correctamente.' : result.message);
    if (result.ok) setCart([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="pt-24 max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Realizar pedidos</h1>
        {message && <p className="mb-3">{message}</p>}
        <div className="bg-white p-4 rounded shadow">
          {details.length === 0 ? <p>Tu carrito está vacío.</p> : details.map((item) => (
            <div key={item.productId} className="flex justify-between border-b py-2">
              <span>{item.nombre} x {item.quantity}</span>
              <span>${(item.precio * item.quantity).toLocaleString('es-CO')}</span>
            </div>
          ))}
          <p className="font-semibold mt-3">Total: ${total.toLocaleString('es-CO')}</p>
          <button onClick={confirmOrder} className="mt-4 bg-black text-white px-4 py-2 rounded">Confirmar pedido</button>
        </div>
      </main>
    </div>
  );
}
