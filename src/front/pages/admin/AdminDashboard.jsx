import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h1>Bienvenido, Admin</h1>
      

      <div className="d-grid gap-2 col-6 mx-auto">
        <Link to="/admin/usuarios" className="btn btn-outline-primary">
          Ver usuarios
        </Link>
        <Link to="/admin/crear-usuario" className="btn btn-outline-primary">
          Crear usuario
        </Link>
        <Link to="/admin/restaurantes" className="btn btn-outline-success">
          Ver restaurantes
        </Link>
        <Link to="/admin/crear-restaurante" className="btn btn-outline-success">
          Crear restaurante
        </Link>
        <Link to="/admin/settings" className="btn btn-outline-secondary">
          Ajustes
        </Link>
      </div>
    </div>
  );
};