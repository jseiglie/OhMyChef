import { Link } from "react-router-dom";

export const ChefDashboard = () => {
  return (
    <div className="container mt-4">
      <h1>Panel del Chef</h1>

      <div className="d-grid gap-2 col-6 mx-auto">
        <Link to="/chef/registrar-gasto" className="btn btn-outline-warning">
          Registrar gasto
        </Link>
        <Link to="/chef/proveedores" className="btn btn-outline-primary">
          Ver proveedores
        </Link>
        <Link to="/chef/facturas" className="btn btn-outline-success">
          Ver facturas
        </Link>
        <Link to="/chef/settings" className="btn btn-outline-secondary">
          Ajustes
        </Link>
      </div>
    </div>
  );
};
