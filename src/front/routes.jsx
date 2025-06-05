// src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { Login } from "./components/Login";

// Admin
import { AdminDashboard } from "./pages/admin/AdminDashboardBB";
import { Usuarios } from "./pages/admin/Usuarios";
import { CrearUsuario } from "./pages/admin/CrearUsuario";
import { Restaurantes } from "./pages/admin/RestaurantesBB";
import { CrearRestaurante } from "./pages/admin/CrearRestaurante";
import { AdminSettings } from "./pages/admin/AdminSettings";

// Encargado
import { EncargadoDashboard } from "./pages/encargado/EncargadoDashboard";
import { RegistrarVenta } from "./pages/encargado/RegistrarVenta";
import { ReporteVentas } from "./pages/encargado/ReporteVentas";
import { EncargadoSettings } from "./pages/encargado/EncargadoSettings";
import { RegistrarGasto as RegistrarGastoEncargado } from "./pages/encargado/RegistrarGasto";
import { Proveedores as ProveedoresEncargado } from "./pages/encargado/Proveedores";

// Chef
import { ChefDashboard } from "./pages/chef/ChefDashboard";
import { RegistrarGasto as RegistrarGastoChef } from "./pages/chef/RegistrarGasto";
import { Proveedores as ProveedoresChef } from "./pages/chef/Proveedores";
import { Facturas } from "./pages/chef/Facturas";
import { ChefSettings } from "./pages/chef/ChefSettings";
import { Sidebar } from "./components/Sidebar";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />


      {/* Admin */}
      <Route path="admin/sidebar" element={<Sidebar />}>
        <Route index element={<AdminDashboard />} /> {/* Se cargará en /admin */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="crear-usuario" element={<CrearUsuario />} />
        <Route path="restaurantes" element={<Restaurantes />} />
        <Route path="crear-restaurante" element={<CrearRestaurante />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Encargado */}
      <Route path="encargado/dashboard" element={<EncargadoDashboard />} />
      <Route path="encargado/registrar-venta" element={<RegistrarVenta />} />
      <Route path="encargado/reporte-ventas" element={<ReporteVentas />} />
      <Route path="encargado/settings" element={<EncargadoSettings />} />
      <Route path="encargado/registrar-gasto" element={<RegistrarGastoEncargado />} />
      <Route path="encargado/proveedores" element={<ProveedoresEncargado />} />

      {/* Chef */}
      <Route path="chef/dashboard" element={<ChefDashboard />} />
      <Route path="chef/registrar-gasto" element={<RegistrarGastoChef />} />
      <Route path="chef/proveedores" element={<ProveedoresChef />} />
      <Route path="chef/facturas" element={<Facturas />} />
      <Route path="chef/settings" element={<ChefSettings />} />
    </Route>
  )
);
