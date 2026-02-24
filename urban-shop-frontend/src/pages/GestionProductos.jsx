import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProducts, saveProducts } from "../services/storeService";

const emptyForm = { nombre: "", descripcion: "", precio: "", imagen_url: "", stock: "", categoria: "" };

export default function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => setProducts(getProducts()), []);

  const submitProduct = (e) => {
    e.preventDefault();
    const payload = { ...form, precio: Number(form.precio), stock: Number(form.stock) };
    const updated = editingId
      ? products.map((p) => (p.id === editingId ? { ...p, ...payload } : p))
      : [...products, { id: crypto.randomUUID(), ...payload }];
    setProducts(updated);
    saveProducts(updated);
    setForm(emptyForm);
    setEditingId(null);
  };

  const editProduct = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="pt-24 max-w-6xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Gestionar productos</h1>
        <form onSubmit={submitProduct} className="grid md:grid-cols-3 gap-3 bg-white p-4 rounded shadow">
          <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre" className="p-2 border rounded" />
          <input required value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" className="p-2 border rounded" />
          <input required value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} type="number" placeholder="Precio" className="p-2 border rounded" />
          <input required value={form.imagen_url} onChange={(e) => setForm({ ...form, imagen_url: e.target.value })} placeholder="URL imagen" className="p-2 border rounded" />
          <input required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} type="number" placeholder="Stock" className="p-2 border rounded" />
          <input required value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} placeholder="Categoría" className="p-2 border rounded" />
          <button className="md:col-span-3 bg-black text-white p-2 rounded">{editingId ? "Actualizar" : "Crear"} producto</button>
        </form>

        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td>{p.nombre}</td><td>${p.precio.toLocaleString("es-CO")}</td><td>{p.stock}</td>
                  <td className="space-x-2 py-2">
                    <button onClick={() => editProduct(p)} className="text-blue-600">Editar</button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-600">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
