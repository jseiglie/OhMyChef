import React from "react";
import { ResumenGastoCard } from "./ResumenGastoCard";

export const EncargadoDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Panel del Encargado</h2>

      {/* Tarjeta del resumen del % de gastos */}
      <ResumenGastoCard />

      {/* Aquí podrías mostrar otras cards, accesos, gráficos, etc */}
    </div>
  );
};