import { Link } from "react-router-dom";

export const EncargadoDashboard = () => {
  return (
    <div className="container mt-4">
      <h1>Panel del Encargado</h1>
      

      <div className="d-grid gap-2 col-6 mx-auto">
        <Link to="/encargado/registrar-venta" className="btn btn-outline-success">
          Registrar venta
        </Link>
        <Link to="/encargado/reporte-ventas" className="btn btn-outline-primary">
          Ver reporte de ventas
        </Link>
        <Link to="/encargado/registrar-gasto" className="btn btn-outline-warning">
          Registrar gasto
        </Link>
        <Link to="/encargado/proveedores" className="btn btn-outline-info">
          Ver proveedores
        </Link>
        <Link to="/encargado/settings" className="btn btn-outline-secondary">
          Ajustes
        </Link>
      </div>
    </div>
  );
};