const express = require('express');
const db = require('../config/conexion');

const router = express.Router();

router.get('/info', async (_req, res) => {
  try {
    const [[usuarios]] = await db.query('SELECT COUNT(*) AS total FROM usuarios');
    const [[productos]] = await db.query('SELECT COUNT(*) AS total FROM productos');
    const [[pedidos]] = await db.query('SELECT COUNT(*) AS total FROM pedidos');

    res.json({
      usuarios: usuarios.total,
      productos: productos.total,
      pedidos: pedidos.total,
    });
  } catch (error) {
    console.error('Error al consultar info del sistema:', error);
    res.status(500).json({ error: 'Error al consultar información del sistema' });
  }
});

module.exports = router;
