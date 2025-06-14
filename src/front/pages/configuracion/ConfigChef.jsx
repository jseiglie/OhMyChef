import React from "react";
import { DatosPersonales } from "./Datos/DatosPersonales.jsx";
import { CambiarContrasena } from "./Datos/CambiarContrasena.jsx";
import { MonedaPrincipal } from "./Datos/MonedaPrincipal.jsx";

const ConfigChef = () => {
  return (
    <div className="container mt-4">
      <h2>Configuración del Chef</h2>
      <hr />
      <DatosPersonales />
      <CambiarContrasena />
      <MonedaPrincipal />
    </div>
  );
};
export default ConfigChef;