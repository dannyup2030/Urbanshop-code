// controllers/productoController.js
const db = require('../config/conexion');

const validateProductPayload = ({ nombre, descripcion, precio, imagen_url, stock, categoria }) => {
  if (!nombre || typeof nombre !== 'string') return 'El nombre es obligatorio.';
  if (descripcion == null) return 'La descripción es obligatoria.';
  if (!Number.isFinite(Number(precio)) || Number(precio) < 0) return 'El precio debe ser válido.';
  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) return 'El stock debe ser un número entero válido.';
  if (!categoria || typeof categoria !== 'string') return 'La categoría es obligatoria.';
  if (!imagen_url || typeof imagen_url !== 'string') return 'La imagen es obligatoria.';
  return null;
};
const obtenerProductos = async (_req, res) => {
  try {
    const [resultados] = await db.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(resultados);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultados] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (!resultados.length) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(resultados[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};
const crearProducto = async (req, res) => {
  try {
    const payload = req.body;
    const validationError = validateProductPayload(payload);
    if (validationError) return res.status(400).json({ error: validationError });
const { nombre, descripcion, precio, imagen_url, stock, categoria } = payload;
    const query = 'INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria) VALUES (?, ?, ?, ?, ?, ?)';
    const [resultado] = await db.query(query, [nombre, descripcion, Number(precio), imagen_url, Number(stock), categoria]);
    res.status(201).json({ mensaje: 'Producto creado correctamente', id: resultado.insertId });
  } catch (error) {
    console.error('Error al insertar producto:', error);
    res.status(500).json({ error: 'Error al insertar producto' });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const validationError = validateProductPayload(payload);
    if (validationError) return res.status(400).json({ error: validationError });
const { nombre, descripcion, precio, imagen_url, stock, categoria } = payload;
    const sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, imagen_url=?, stock=?, categoria=? WHERE id=?';
    const [resultado] = await db.query(sql, [nombre, descripcion, Number(precio), imagen_url, Number(stock), categoria, id]);
    if (!resultado.affectedRows) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query('DELETE FROM productos WHERE id = ?', [id]);
    if (!resultado.affectedRows) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};