import React, { useState } from "react";

const sampleProducts = [
  {
    id: 'prod-1',
    name: 'Camiseta Urban Classic',
    description: 'Algodón 100% premium',
    price: 89900,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'hombres'
  },
  {
    id: 'prod-2',
    name: 'Jeans Slim Fit',
    description: 'Denim elástico cómodo',
    price: 129900,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'hombres'
  },
  {
    id: 'prod-3',
    name: 'Vestido Floral',
    description: 'Tela ligera de verano',
    price: 109900,
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'mujeres'
  },
  {
    id: 'prod-4',
    name: 'Zapatos Urbanos',
    description: 'Estilo moderno y cómodo',
    price: 159900,
    imageUrl: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'unisex'
  },
  {
    id: 'prod-5',
    name: 'Gorra Streetwear',
    description: 'Ajustable y transpirable',
    price: 49900,
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'unisex'
  },
];

export default function Productos() {
  const [products] = useState(sampleProducts);

  return (
    <div
      id="carousel"
      className="flex overflow-x-auto gap-6 px-10 scroll-smooth snap-x"
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="min-w-[250px] max-w-xs bg-gray-100 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 snap-start mx-2"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[300px] object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-md font-bold text-green-600">
              ${product.price.toLocaleString("es-CO")} COP
            </p>
            <div className="flex items-center space-x-2">
              <label className="text-sm">Cantidad:</label>
              <input
                type="number"
                defaultValue="1"
                min="1"
                className="w-16 px-2 py-1 border rounded-md text-sm focus:outline-none"
              />
            </div>
            <button className="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 text-sm">
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
