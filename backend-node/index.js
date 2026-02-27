require("dotenv").config(); // Carga variables del .env

const express = require('express');
const cors = require('cors');

const productoRoutes = require('./routes/productoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes.js');
const systemRoutes = require('./routes/systemRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Servidor backend Urban Shop funcionando correctamente');
});

app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/sistema', systemRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor backend iniciado en http://localhost:${port}`);
});