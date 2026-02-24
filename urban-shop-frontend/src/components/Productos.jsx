import React, { useState } from "react";

export default function Productos({ products, onAddToCart }) {
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Number(value) || 1 }));
  };

  return (
    <div id="carousel" className="flex overflow-x-auto gap-6 px-10 scroll-smooth snap-x">
      {products.map((product) => (
        <div key={product.id} className="min-w-[250px] max-w-xs bg-gray-100 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 snap-start mx-2">
          <img src={product.imagen_url} alt={product.nombre} className="w-full h-[300px] object-cover" />
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{product.nombre}</h3>
            <p className="text-sm text-gray-600">{product.descripcion}</p>
            <p className="text-md font-bold text-green-600">${product.precio.toLocaleString("es-CO")} COP</p>
            <div className="flex items-center space-x-2">
              <label className="text-sm">Cantidad:</label>
              <input type="number" value={quantities[product.id] || 1} min="1" className="w-16 px-2 py-1 border rounded-md text-sm focus:outline-none" onChange={(e) => updateQuantity(product.id, e.target.value)} />
            </div>
            <button onClick={() => onAddToCart(product.id, quantities[product.id] || 1)} className="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 text-sm">
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
