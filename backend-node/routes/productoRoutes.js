// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para obtener todos los productos
router.get('/', productoController.obtenerProductos);

module.exports = router;
