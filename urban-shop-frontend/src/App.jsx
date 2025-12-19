import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas (luego migramos el HTML a cada una)
import Inicio from "./pages/Inicio.jsx";
import Registro from "./pages/Registro.jsx";
import Sesion from "./pages/Sesion.jsx";
import Recuperar from "./pages/Recuperar.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/Sesion" element={<Sesion />} />
        <Route path="/recuperar" element={<Recuperar />} />
      </Routes>
    </Router>
  );
}

export default App;
