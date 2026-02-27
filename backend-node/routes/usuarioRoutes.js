const express = require('express');
const db = require('../config/conexion');

const router = express.Router();

let cachedPasswordColumn;
let cachedUserColumns;

const normalize = (value) =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const getUserColumns = async () => {
  if (cachedUserColumns) return cachedUserColumns;
  const [rows] = await db.query('SHOW COLUMNS FROM usuarios');
  cachedUserColumns = rows;
  return cachedUserColumns;
};

const findColumn = (columns, candidates, { fuzzy = false } = {}) => {
  const exact = columns.find((column) => candidates.includes(normalize(column.Field)));
  if (exact) return exact.Field;
  if (!fuzzy) return null;

  const fuzzyMatch = columns.find((column) => {
    const name = normalize(column.Field);
    return candidates.some((candidate) => name.includes(candidate));
  });

  return fuzzyMatch ? fuzzyMatch.Field : null;
};

const getPasswordColumn = async () => {
  if (cachedPasswordColumn) return cachedPasswordColumn;

  const userColumns = await getUserColumns();
  const passwordColumn = findColumn(userColumns, ['password', 'contrasena', 'contrasenia', 'clave', 'pass'], { fuzzy: true });

  if (!passwordColumn) {
    throw new Error(`La tabla usuarios no tiene una columna de contraseña compatible. Columnas encontradas: ${userColumns.map((c) => c.Field).join(', ')}`);
  }

  cachedPasswordColumn = passwordColumn;
  return cachedPasswordColumn;
};

const getRequiredColumnsWithoutDefault = (columns) =>
  columns
    .filter((column) => column.Null === 'NO' && column.Default == null && !/auto_increment/i.test(column.Extra || ''))
    .map((column) => column.Field);

router.post('/registro', async (req, res) => {
  try {
    const body = req.body || {};
    const { nombre, apellido = '', email, celular, cedula, fechaNacimiento, fecha_nacimiento, password } = body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Los campos nombre, email y password son obligatorios.' });
    }

    const userColumns = await getUserColumns();
    const passwordColumn = await getPasswordColumn();
    const apellidoColumn = findColumn(userColumns, ['apellido']);
    const fechaColumn = findColumn(userColumns, ['fecha_nacimiento', 'fechanacimiento', 'nacimiento'], { fuzzy: true });

    const [exists] = await db.query('SELECT id FROM usuarios WHERE email = ? LIMIT 1', [email]);
    if (exists.length) return res.status(409).json({ error: 'Este correo ya está registrado.' });

    const insertData = {
      nombre,
      email,
      celular: celular || null,
      cedula: cedula || null,
      ...(fechaColumn ? { [fechaColumn]: fechaNacimiento || fecha_nacimiento || null } : {}),
      [passwordColumn]: password,
    };

    if (apellidoColumn) insertData[apellidoColumn] = apellido;

    const requiredColumns = getRequiredColumnsWithoutDefault(userColumns);
    const missingRequired = requiredColumns.filter((column) => insertData[column] == null);

    if (missingRequired.length) {
      return res.status(400).json({ error: `Faltan campos obligatorios para registrar usuario: ${missingRequired.join(', ')}` });
    }

    const columns = Object.keys(insertData);
    const values = Object.values(insertData);
    const placeholders = columns.map(() => '?').join(', ');
    const escapedColumns = columns.map((column) => `\`${column}\``).join(', ');

    await db.query(
       `INSERT INTO usuarios (${escapedColumns}) VALUES (${placeholders})`,
      values,
    );

    return res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const credentials = req.body || {};
    const userEmail = (credentials.email || '').toString().trim();
    const userPassword = (credentials.password || '').toString();

    if (!userEmail || !userPassword) {
      return res.status(400).json({ error: 'Los campos email y password son obligatorios.' });
    }

    const passwordColumn = await getPasswordColumn();
    const [users] = await db.query(
      `SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND \`${passwordColumn}\` = ? LIMIT 1`,
      [userEmail, userPassword],
    );
    if (!users.length) return res.status(401).json({ error: 'Credenciales inválidas.' });
    return res.json({ mensaje: 'Sesión iniciada correctamente.', user: users[0] });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, email, celular, cedula, fecha_nacimiento FROM usuarios ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar usuarios:', error);
    res.status(500).json({ error: 'Error al consultar usuarios' });
  }
});

module.exports = router;