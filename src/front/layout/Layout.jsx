import React from "react";
import { Outlet } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { LoadingScreen } from "../components/LoadingScreen";
import { Footer } from "../components/Footer"; // Si lo tienes

export const Layout = () => {
  const { store } = useGlobalReducer();
  const user = store.user || {};

  if (!user || !user.rol) return <LoadingScreen />;

  const role = user.rol;

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar role={role} />
        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
