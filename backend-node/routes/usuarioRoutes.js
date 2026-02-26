const express = require('express');
const db = require('../config/conexion');

const router = express.Router();

router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, celular, cedula, fechaNacimiento, password } = req.body;
    const [exists] = await db.query('SELECT id FROM usuarios WHERE email = ? LIMIT 1', [email]);
    if (exists.length) return res.status(409).json({ error: 'Este correo ya está registrado.' });

    await db.query(
      'INSERT INTO usuarios (nombre, email, celular, cedula, fecha_nacimiento, password) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, celular, cedula, fechaNacimiento, password],
    );

    return res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query(
      'SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND password = ? LIMIT 1',
      [email, password],
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