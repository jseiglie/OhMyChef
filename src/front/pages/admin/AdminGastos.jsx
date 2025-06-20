import React from "react";
import ResumenGastos from "./VistaGastos/ResumenGastos"
import GastoPorRestauranteChart from "./VistaGastos/GastoPorRestauranteChart"
import EvolucionGastoMensual from "./VistaGastos/EvolucionGastoMensual"
import TablaProveedores from "./VistaGastos/TablaProveedores"
import FiltrosGasto from "./VistaGastos/FiltrosGasto"

export const AdminGastos = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Resumen de gastos globales</h1>
      <p className="text-muted mb-3 small">Comparativa mensual por restaurante y proveedor</p>
      {/* Resumen tarjetas */}
      <div className="row mb-3">
        <ResumenGastos />
      </div>
      {/* Gráfico barras y evolución */}
      <div className="row mb-3">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-3">
          <GastoPorRestauranteChart />
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-3">
          <EvolucionGastoMensual />
        </div>
      </div>
      {/* Tabla proveedores con filtros */}
      <div className="row mb-3">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-3">
          <TablaProveedores />
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-3">
          <FiltrosGasto />
        </div>
      </div>
    </div>
  );
};







