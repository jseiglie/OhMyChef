import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const Layout = () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const role = user.rol || "admin"; // fallback si no está definido

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar role={role} />
        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
