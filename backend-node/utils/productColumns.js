const db = require('../config/conexion');

let cachedColumns;
let cachedMap;

const normalize = (value) =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const getProductoColumns = async () => {
  if (cachedColumns) return cachedColumns;
  const [rows] = await db.query('SHOW COLUMNS FROM productos');
  cachedColumns = rows;
  return cachedColumns;
};

const resolveColumn = (columns, candidates, { fuzzy = false } = {}) => {
  const exact = columns.find((column) => candidates.includes(normalize(column.Field)));
  if (exact) return exact.Field;
  if (!fuzzy) return null;

  const fuzzyMatch = columns.find((column) => {
    const field = normalize(column.Field);
    return candidates.some((candidate) => field.includes(candidate));
  });

  return fuzzyMatch ? fuzzyMatch.Field : null;
};

const getProductoColumnMap = async () => {
  if (cachedMap) return cachedMap;
  const columns = await getProductoColumns();

  cachedMap = {
    id: resolveColumn(columns, ['id']),
    nombre: resolveColumn(columns, ['nombre', 'name', 'titulo', 'producto'], { fuzzy: true }),
    descripcion: resolveColumn(columns, ['descripcion', 'description', 'detalle'], { fuzzy: true }),
    precio: resolveColumn(columns, ['precio', 'price', 'valor', 'costo'], { fuzzy: true }),
    imagen: resolveColumn(columns, ['imagen_url', 'imagen', 'image', 'url_imagen'], { fuzzy: true }),
    stock: resolveColumn(columns, ['stock', 'cantidad', 'existencia', 'inventario'], { fuzzy: true }),
    categoria: resolveColumn(columns, ['categoria', 'category', 'tipo'], { fuzzy: true }),
  };

  return cachedMap;
};

module.exports = { getProductoColumnMap, getProductoColumns };