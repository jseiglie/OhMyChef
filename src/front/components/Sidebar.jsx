import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = ({ role }) => {
  const links = {
    admin: [
      { path: "/admin/dashboard", label: "Dashboard" },
      { path: "/admin/usuarios", label: "Usuarios" },
      { path: "/admin/restaurantes", label: "Restaurantes" }
    ],
    encargado: [
      { path: "/encargado/dashboard", label: "Dashboard" },
      { path: "/encargado/registrar-venta", label: "Registrar Venta" },
      { path: "/encargado/reporte-ventas", label: "Reporte Ventas" }
    ],
    chef: [
      { path: "/chef/dashboard", label: "Dashboard" },
      { path: "/chef/registrar-gasto", label: "Registrar Gasto" },
      { path: "/chef/proveedores", label: "Proveedores" },
      { path: "/chef/facturas", label: "Facturas" }
    ]
  };

  return (
    <aside className="bg-light p-3" style={{ minWidth: '200px', height: '100vh' }}>
      <h5 className="mb-3">Menú</h5>
      <ul className="list-unstyled">
        {links[role]?.map(link => (
          <li key={link.path}>
            <Link to={link.path} className="d-block mb-2">{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};