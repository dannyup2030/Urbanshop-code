// controllers/productoController.js
const db = require('../config/conexion');
const { getProductoColumnMap } = require('../utils/productColumns');

const normalizeKey = (value) =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const getField = (payload, aliases, fallback = '') => {
  if (!payload || typeof payload !== 'object') return fallback;

  const normalizedAliases = aliases.map((alias) => normalizeKey(alias));
  const match = Object.keys(payload).find((key) => normalizedAliases.includes(normalizeKey(key)));

  if (!match) return fallback;
  return payload[match];
};

const normalizeProductPayload = (payload = {}) => ({
   nombre: (getField(payload, ['nombre', 'name', 'titulo', 'producto', 'nombre_producto', 'producto_nombre']) ?? '').toString().trim(),
  descripcion: (getField(payload, ['descripcion', 'description', 'detalle', 'descripcion_producto']) ?? '').toString().trim(),
  precio: getField(payload, ['precio', 'price', 'valor', 'costo', 'precio_producto']),
  imagen_url: (getField(payload, ['imagen_url', 'imagen', 'image', 'image_url', 'url_imagen', 'foto']) ?? '').toString().trim(),
  stock: getField(payload, ['stock', 'cantidad', 'existencia', 'inventario']),
  categoria: (getField(payload, ['categoria', 'category', 'tipo']) ?? '').toString().trim(),
});


const getRequestPayload = (req = {}) => req.body?.producto ?? req.body?.product ?? req.body?.data ?? req.body ?? {};

const validateProductPayload = (payload = {}) => {
  if (!payload || typeof payload !== 'object') return 'El cuerpo de la solicitud es inválido.';
  const normalized = normalizeProductPayload(payload);

  if (!normalized.nombre) return 'El nombre es obligatorio.';
  if (!normalized.descripcion) return 'La descripción es obligatoria.';
  if (!Number.isFinite(Number(normalized.precio)) || Number(normalized.precio) < 0) return 'El precio debe ser válido.';
  if (!Number.isInteger(Number(normalized.stock)) || Number(normalized.stock) < 0) return 'El stock debe ser un número entero válido.';
  if (!normalized.categoria) return 'La categoría es obligatoria.';
  if (!normalized.imagen_url) return 'La imagen es obligatoria.';

  return normalized;
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
    const payload = getRequestPayload(req);
    const validated = validateProductPayload(payload);
    if (typeof validated === 'string') return res.status(400).json({ error: validated });

    const columns = await getProductoColumnMap();
    if (!columns.nombre || !columns.precio || !columns.stock) {
      return res.status(500).json({ error: 'La tabla productos no tiene columnas compatibles para nombre/precio/stock.' });
    }

    const insertColumns = [
      columns.nombre,
      columns.descripcion,
      columns.precio,
      columns.imagen,
      columns.stock,
      columns.categoria,
    ].filter(Boolean);

    const dataBySemantic = {
      [columns.nombre]: validated.nombre,
      [columns.descripcion]: validated.descripcion,
      [columns.precio]: Number(validated.precio),
      [columns.imagen]: validated.imagen_url,
      [columns.stock]: Number(validated.stock),
      [columns.categoria]: validated.categoria,
    };

    const placeholders = insertColumns.map(() => '?').join(', ');
    const escapedColumns = insertColumns.map((column) => `\`${column}\``).join(', ');
    const values = insertColumns.map((column) => dataBySemantic[column]);

    const [resultado] = await db.query(`INSERT INTO productos (${escapedColumns}) VALUES (${placeholders})`, values);
    res.status(201).json({ mensaje: 'Producto creado correctamente', id: resultado.insertId });
  } catch (error) {
    console.error('Error al insertar producto:', error);
    res.status(500).json({ error: 'Error al insertar producto' });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
        const payload = getRequestPayload(req);
    const validated = validateProductPayload(payload);
    if (typeof validated === 'string') return res.status(400).json({ error: validated });

    const columns = await getProductoColumnMap();
    if (!columns.nombre || !columns.precio || !columns.stock) {
      return res.status(500).json({ error: 'La tabla productos no tiene columnas compatibles para nombre/precio/stock.' });
    }

    const updates = [
      [columns.nombre, validated.nombre],
      [columns.descripcion, validated.descripcion],
      [columns.precio, Number(validated.precio)],
      [columns.imagen, validated.imagen_url],
      [columns.stock, Number(validated.stock)],
      [columns.categoria, validated.categoria],
    ].filter(([column]) => Boolean(column));

    const setSql = updates.map(([column]) => `\`${column}\` = ?`).join(', ');
    const values = updates.map(([, value]) => value);

    const [resultado] = await db.query(`UPDATE productos SET ${setSql} WHERE id = ?`, [...values, id]);
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