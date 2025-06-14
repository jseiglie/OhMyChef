import React from "react";
import { DatosPersonales } from "./Datos/DatosPersonales.jsx";
import { CambiarContrasena } from "./Datos/CambiarContrasena.jsx";
import { MonedaPrincipal } from "./Datos/MonedaPrincipal.jsx";

const ConfigEncargado = () => {
  return (
    <div className="container mt-4">
      <h2>Configuración del Encargado</h2>
      <hr />
      <DatosPersonales />
      <CambiarContrasena />
      <MonedaPrincipal />
    </div>
  );
};
export default ConfigEncargado;