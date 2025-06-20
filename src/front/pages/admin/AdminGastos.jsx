import React from "react";
import ResumenGastos from "./VistaGastos/ResumenGastos"
import GastoPorRestauranteChart from "./VistaGastos/GastoPorRestauranteChart"
import EvolucionGastoMensual from "./VistaGastos/EvolucionGastoMensual"
import TablaProveedores from "./VistaGastos/TablaProveedores"
import FiltrosGasto from "./VistaGastos/FiltrosGasto"

export const AdminGastos = () => {
  return (
    <div className="container-fluid px-2 py-2">
      <h1 className="my-2 h4">Resumen de gastos globales</h1>
      <p className="text-muted mb-3 small">Comparativa mensual por restaurante y proveedor</p>
      {/* Resumen tarjetas */}
      <div className="row mb-3">
        <ResumenGastos />
      </div>
      {/* Gráfico barras y evolución */}
      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <GastoPorRestauranteChart />
        </div>
        <div className="col-md-6 mb-3">
          <EvolucionGastoMensual />
        </div>
      </div>
      {/* Tabla proveedores con filtros */}
      <div className="row mb-3">
        <div className="col-md-8 mb-4">
          <TablaProveedores />
        </div>
        <div className="col-md-4 mb-4">
          <FiltrosGasto />
        </div>
      </div>
    </div>
  );
};







