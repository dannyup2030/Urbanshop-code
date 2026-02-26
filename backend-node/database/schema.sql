CREATE DATABASE IF NOT EXISTS urban_shop;
USE urban_shop;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  celular VARCHAR(20) NOT NULL,
  cedula VARCHAR(20) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  imagen_url TEXT,
  stock INT NOT NULL DEFAULT 0,
  categoria VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(120) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pedido_user_email FOREIGN KEY (user_email) REFERENCES usuarios(email)
);

CREATE TABLE IF NOT EXISTS pedido_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_item_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  CONSTRAINT fk_item_producto FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria)
SELECT 'Camiseta Urban Classic', 'Algodón 100% premium', 89900, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80', 25, 'hombres'
WHERE NOT EXISTS (SELECT 1 FROM productos);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria)
SELECT 'Jeans Slim Fit', 'Denim elástico cómodo', 129900, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80', 18, 'hombres'
WHERE (SELECT COUNT(*) FROM productos) = 1;

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria)
SELECT 'Vestido Floral', 'Tela ligera de verano', 109900, 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=500&q=80', 14, 'mujeres'
WHERE (SELECT COUNT(*) FROM productos) = 2;
