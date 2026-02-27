const express = require('express');
const db = require('../config/conexion');
const { getProductoColumnMap } = require('../utils/productColumns');

const router = express.Router();

router.post('/', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { userEmail, items } = req.body;
    if (!userEmail || !Array.isArray(items) || !items.length) {
      connection.release();
      return res.status(400).json({ error: 'Pedido inválido.' });
    }

    const productColumns = await getProductoColumnMap();
    if (!productColumns.nombre || !productColumns.precio || !productColumns.stock) {
      connection.release();
      return res.status(500).json({ error: 'La tabla productos no tiene columnas compatibles para crear pedidos.' });
    }

    await connection.beginTransaction();

    const productIds = items.map((i) => i.productId);
    const [products] = await connection.query(
      `SELECT id, \`${productColumns.nombre}\` AS nombre, \`${productColumns.precio}\` AS precio, \`${productColumns.stock}\` AS stock FROM productos WHERE id IN (${productIds.map(() => '?').join(',')})`,
      productIds,
    );

    const map = new Map(products.map((p) => [p.id, p]));
    let total = 0;

    for (const item of items) {
      const product = map.get(item.productId);
      if (!product) throw new Error(`Producto no encontrado: ${item.productId}`);
      if (Number(product.stock) < Number(item.quantity)) throw new Error(`Stock insuficiente para ${product.nombre}`);
      total += Number(product.precio) * Number(item.quantity);
    }

    const [orderResult] = await connection.query(
      'INSERT INTO pedidos (user_email, total) VALUES (?, ?)',
      [userEmail, total],
    );

    for (const item of items) {
      const product = map.get(item.productId);
      await connection.query(
        'INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [orderResult.insertId, item.productId, item.quantity, product.precio],
      );
      await connection.query(`UPDATE productos SET \`${productColumns.stock}\` = \`${productColumns.stock}\` - ? WHERE id = ?`, [item.quantity, item.productId]);
    }

    await connection.commit();
    connection.release();
    return res.status(201).json({ mensaje: 'Pedido realizado correctamente.' });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('Error al crear pedido:', error.message);
    return res.status(400).json({ error: error.message || 'Error al crear pedido' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT id, user_email, total, fecha FROM pedidos ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar pedidos:', error);
    res.status(500).json({ error: 'Error al consultar pedidos' });
  }
});

module.exports = router;