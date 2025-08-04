require("dotenv").config(); // Carga variables del .env

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión a la base de datos:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL");
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend Urban Shop funcionando correctamente");
});

// Importar y usar las rutas del módulo de productos
const productoRoutes = require("./routes/productoRoutes");
app.use("/api/productos", productoRoutes); // Ej: http://localhost:3001/api/productos

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend iniciado en http://localhost:${port}`);
});
