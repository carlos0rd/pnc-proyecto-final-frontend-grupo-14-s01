// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from '../pages/Auth/Register';
import DashboardCliente from "../pages/Cliente/DashboardCliente"
import VehiculosCliente from "../pages/Cliente/VehiculosCliente"
import ReparacionesCliente from "../pages/Cliente/ReparacionesCliente"
import ServiciosCliente from "../pages/Cliente/ServiciosCliente"
import FacturasCliente from "../pages/Cliente/FacturasCliente"
import DashboardAdmin from "../pages/Admin/DashboardAdmin"
import GestionUsuarios from "../pages/Admin/GestionUsuarios"
import GestionVehiculos from "../pages/Admin/GestionVehiculos"
import DashboardMecanico from "../pages/Mecanico/DashboardMecanico"
import VehiculosMecanico from "../pages/Mecanico/VehiculosMecanico"
import ReparacionesMecanico from "../pages/Mecanico/ReparacionesMecanico"
import ServiciosClienteDesdeMecanico from "../pages/Mecanico/ServiciosClienteDesdeMecanico"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-cliente" element={<DashboardCliente />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-mecanico" element={<DashboardMecanico />} />
        <Route path="/vehiculos-cliente" element={<VehiculosCliente />} />
        <Route path="/reparaciones-cliente/:id" element={<ReparacionesCliente />} />
        <Route path="/servicios-cliente/:vehiculoId/:reparacionId" element={<ServiciosCliente />} />
        <Route path="/facturas-cliente" element={<FacturasCliente />} />
        <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
        <Route path="/gestion-vehiculos" element={<GestionVehiculos />} />
        <Route path="/vehiculos-mecanico" element={<VehiculosMecanico />} />
        <Route path="/reparaciones-mecanico/:id" element={<ReparacionesMecanico />} />
        <Route path="/servicios-mecanico/:vehiculoId/:reparacionId" element={<ServiciosClienteDesdeMecanico />} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;