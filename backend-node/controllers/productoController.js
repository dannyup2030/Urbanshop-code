// controllers/productoController.js
const db = require('../config/conexion');

// Obtener todos los productos
const obtenerProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, resultados) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      res.json(resultados);
    }
  });
};

// Obtener un producto por ID
const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, resultados) => {
    if (err) {
      console.error('Error al obtener producto:', err);
      res.status(500).json({ error: 'Error al obtener producto' });
    } else if (resultados.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(resultados[0]);
    }
  });
};

// Crear nuevo producto
const crearProducto = (req, res) => {
  const { nombre, descripcion, precio, imagen_url, stock, categoria_id } = req.body;

  const query = `
    INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nombre, descripcion, precio, imagen_url, stock, categoria_id], (err, resultado) => {
    if (err) {
      console.error('Error al insertar producto:', err);
      res.status(500).json({ error: 'Error al insertar producto' });
    } else {
      res.status(201).json({ mensaje: 'Producto creado correctamente', id: resultado.insertId });
    }
  });
};


// Actualizar producto existente
const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, imagen_url, stock, categoria_id } = req.body;
  const sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, imagen_url=?, stock=?, categoria_id=? WHERE id=?';
  db.query(sql, [nombre, descripcion, precio, imagen_url, stock, categoria_id, id], (err, resultado) => {
    if (err) {
      console.error('Error al actualizar producto:', err);
      res.status(500).json({ error: 'Error al actualizar producto' });
    } else {
      res.json({ mensaje: 'Producto actualizado correctamente' });
    }
  });
};

// Eliminar producto
const eliminarProducto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, resultado) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      res.status(500).json({ error: 'Error al eliminar producto' });
    } else {
      res.json({ mensaje: 'Producto eliminado correctamente' });
    }
  });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
