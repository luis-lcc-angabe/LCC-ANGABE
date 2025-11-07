import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Clases from "./Clases";
import Cotizacion from "./Cotizacion";
import Formulario from "./Formulario";
import Intercambio from "./Intercambio";
import Traducciones from "./Traducciones";

const Router = () => (
  // Use Vite's BASE_URL so the app works both in dev ("/") and in production
  // when deployed under the /LCC-ANGABE/ subpath.
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clases" element={<Clases />} />
      <Route path="/cotizacion" element={<Cotizacion />} />
      <Route path="/formulario" element={<Formulario />} />
      <Route path="/intercambio" element={<Intercambio />} />
      <Route path="/traducciones" element={<Traducciones />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
