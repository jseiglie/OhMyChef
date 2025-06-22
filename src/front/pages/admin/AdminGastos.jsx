import React from "react";
import ResumenGastos from "./VistaGastos/ResumenGastos";
import GastoPorRestauranteChart from "./VistaGastos/GastoPorRestauranteChart";
import EvolucionGastoMensual from "./VistaGastos/EvolucionGastoMensual";
import TablaProveedores from "./VistaGastos/TablaProveedores";
import FiltrosGasto from "./VistaGastos/FiltrosGasto";
const AdminGastos = () => {
  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="mb-4">
        <h2 className="fw-bold">Resumen de gastos globales</h2>
        <p className="text-muted">
          Comparativa mensual por restaurante y proveedor
        </p>
      </div>
      {/* KPIs principales */}
      <ResumenGastos />
      {/* Gráficos: barras y línea */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card p-3 h-100">
            <GastoPorRestauranteChart />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-3 h-100">
            <EvolucionGastoMensual />
          </div>
        </div>
      </div>
      {/* Tabla + filtros como columnas separadas */}
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card p-3 h-100">
            <h5 className="mb-3">Top proveedores por gasto total</h5>
            <TablaProveedores />
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card p-3 h-100">
            <h6 className="mb-3">Filtros</h6>
            <FiltrosGasto />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminGastos;





















