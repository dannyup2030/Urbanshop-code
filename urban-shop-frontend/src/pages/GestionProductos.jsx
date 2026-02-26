import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { createProduct, deleteProductById, getCurrentUser, getProducts, updateProduct } from '../services/storeService';

const emptyForm = { nombre: '', descripcion: '', precio: '', imagen_url: '', stock: '', categoria: '' };

export default function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.rol === 'administrador';

  const loadProducts = async () => {
    try {
      setProducts(await getProducts());
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submitProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        setMessage('Producto actualizado correctamente.');
      } else {
        await createProduct(payload);
        setMessage('Producto creado correctamente.');
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editProduct = (product) => {
    setForm({
      nombre: product.nombre || '',
      descripcion: product.descripcion || '',
      precio: product.precio ?? '',
      imagen_url: product.imagen_url || '',
      stock: product.stock ?? '',
      categoria: product.categoria || '',
    });
    setEditingId(product.id);
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductById(id);
      setMessage('Producto eliminado correctamente.');
      await loadProducts();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="pt-24 max-w-6xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Gestionar productos</h1>
        {!isAdmin && <p className="text-center text-red-600">Solo un administrador puede agregar, editar y eliminar productos.</p>}
        {message && <p className="text-sm text-center">{message}</p>}

        {isAdmin && (
          <form onSubmit={submitProduct} className="grid md:grid-cols-3 gap-3 bg-white p-4 rounded shadow">
            <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre" className="p-2 border rounded" />
            <input required value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" className="p-2 border rounded" />
            <input required value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} type="number" min="0" step="0.01" placeholder="Precio" className="p-2 border rounded" />
            <input required value={form.imagen_url} onChange={(e) => setForm({ ...form, imagen_url: e.target.value })} placeholder="URL imagen" className="p-2 border rounded" />
            <input required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} type="number" min="0" placeholder="Stock" className="p-2 border rounded" />
            <input required value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} placeholder="Categoría" className="p-2 border rounded" />
            <button className="md:col-span-3 bg-black text-white p-2 rounded">{editingId ? 'Actualizar' : 'Crear'} producto</button>
          </form>
        )}

        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td>{p.nombre}</td>
                  <td>${Number(p.precio).toLocaleString('es-CO')}</td>
                  <td>{p.stock}</td>
                  <td>{p.categoria}</td>
                  <td className="space-x-2 py-2">
                    <button disabled={!isAdmin} onClick={() => editProduct(p)} className="text-blue-600 disabled:text-gray-300">Editar</button>
                    <button disabled={!isAdmin} onClick={() => deleteProduct(p.id)} className="text-red-600 disabled:text-gray-300">Eliminar</button>
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