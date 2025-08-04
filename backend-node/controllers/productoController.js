// controllers/productoController.js
const db = require('../config/conexion');

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

module.exports = {
  obtenerProductos
};
