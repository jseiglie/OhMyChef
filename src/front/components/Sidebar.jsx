

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [seemenu, setSeemenu] = useState(true);
    const [menuall, setMenuall] = useState(false);

    // Detectar si el colapso está abierto para rotar la flecha
    const toggleCollapse = () => {
        setCollapsed(collapsed => !collapsed);
        setSeemenu(seemenu => !seemenu);
        setMenuall(menuall => !menuall);

    };
    return (
        <>
            <Navbar />

            <div className="d-flex vh-90">

                <nav id="sidebar" className={`sidebar menu d-flex flex-column p-3 col-3 col-md-2 ${menuall ? "w150" : ""} `}>
                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <span className={`fs-5 menu fw-bold ${seemenu ? "d-none" : ""}`}>Menú</span>

                        <button
                            className="btn btn-light d-md-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#menuItems"
                            //aria-expanded={!collapsed}
                            onClick={toggleCollapse}
                        >
                            <i className={`bi bi-chevron-right ${collapsed ? "rotated" : ""}`}></i>
                        </button>
                    </div>

                    <div className="collapse chefmenu d-md-block" id="menuItems">
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-house me-2"></i> <span>Dashboard</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-shop me-2"></i> <span>Restaurante</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-receipt me-2"></i> <span>Ventas</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-bar-chart-line me-2"></i> <span>Gastos</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-truck me-2"></i> <span>Proveedores</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-people me-2"></i> <span>Usuarios</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="bi bi-gear me-2"></i> <span>Configuracion</span></a>
                            </li>
                        </ul>
                    </div>


                    <div className="logout mt-auto">

                        <a className={`nav-link text-muted d-flex align-items-center ${menuall ? "logout-row" : "logout-column"}`} href="#">

                            <i className="bi bi-box-arrow-left me-2"></i>
                            <span>Log Out</span>
                        </a>
                    </div>
                </nav>

                <div className="flex-grow-1 p-3">
                    <Outlet />
                </div>
            </div>
        </>
    )


}