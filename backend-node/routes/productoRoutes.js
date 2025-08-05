// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Obtener un producto por ID (opcional, útil para pruebas)
router.get('/:id', productoController.obtenerProductoPorId);

// Insertar un nuevo producto
router.post('/', productoController.crearProducto);

// Actualizar un producto existente
router.put('/:id', productoController.actualizarProducto);

// Eliminar un producto
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
