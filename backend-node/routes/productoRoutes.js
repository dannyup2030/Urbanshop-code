// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { requireAdmin } = require('../middlewares/authRole');

router.get('/', productoController.obtenerProductos);

router.get('/:id', productoController.obtenerProductoPorId);

router.post('/', requireAdmin, productoController.crearProducto);
router.put('/:id', requireAdmin, productoController.actualizarProducto);
router.delete('/:id', requireAdmin, productoController.eliminarProducto);


module.exports = router;
