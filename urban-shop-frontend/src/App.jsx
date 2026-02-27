import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Registro from "./pages/Registro.jsx";
import Sesion from "./pages/Sesion.jsx";
import Recuperar from "./pages/Recuperar.jsx";
import GestionProductos from "./pages/GestionProductos.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Sistema from "./pages/Sistema.jsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/gestion-productos" element={<GestionProductos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/sistema" element={<Sistema />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;