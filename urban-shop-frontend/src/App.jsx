import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Registro from "./pages/Registro.jsx";
import Sesion from "./pages/Sesion.jsx";
import Recuperar from "./pages/Recuperar.jsx";
import GestionProductos from "./pages/GestionProductos.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Sistema from "./pages/Sistema.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/gestion-productos" element={<GestionProductos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/sistema" element={<Sistema />} />
      </Routes>
    </Router>
  );
}

export default App;
