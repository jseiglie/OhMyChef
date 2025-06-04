import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [seemenu, setSeemenu] = useState(true);
  const [menuall, setMenuall] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    setSeemenu(!seemenu);
    setMenuall(!menuall);
  };

  return (
    <div className="d-flex vh-90">
      <nav
        id="sidebar"
        className={`sidebar menu d-flex flex-column p-3 col-3 col-md-2 ${menuall ? "w150" : ""}`}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className={`fs-5 menu fw-bold ${seemenu ? "d-none" : ""}`}>Menú</span>
          <button
            className="btn btn-light d-md-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuItems"
            onClick={toggleCollapse}
          >
            <i className={`bi bi-chevron-right ${collapsed ? "rotated" : ""}`}></i>
          </button>
        </div>

        <div className="collapse chefmenu d-md-block" id="menuItems">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                <i className="bi bi-house me-2"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/restaurantes">
                <i className="bi bi-shop me-2"></i> <span>Restaurantes</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/usuarios">
                <i className="bi bi-people me-2"></i> <span>Usuarios</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/crear-usuario">
                <i className="bi bi-person-plus me-2"></i> <span>Crear Usuario</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/crear-restaurante">
                <i className="bi bi-plus-square me-2"></i> <span>Crear Restaurante</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/settings">
                <i className="bi bi-gear me-2"></i> <span>Configuración</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="logout mt-auto">
          <Link
            className={`nav-link text-muted d-flex align-items-center ${menuall ? "logout-row" : "logout-column"}`}
            to="/login"
          >
            <i className="bi bi-box-arrow-left me-2"></i>
            <span>Log Out</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
