// urban_shop/api/proxy.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(express.json());

// Ruta protegida para imágenes
app.get('/api/images', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=urban+fashion+clothing&per_page=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));