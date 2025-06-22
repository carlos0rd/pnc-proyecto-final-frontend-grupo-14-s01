"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ReparacionesCliente = () => {
  const [activeMenu, setActiveMenu] = useState("vehiculos")
  const [userData, setUserData] = useState(null)
  const [vehiculoData, setVehiculoData] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const [reparaciones, setReparaciones] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (!token || !currentUser) {
      navigate("/");
      return;
    }
    setUserData(JSON.parse(currentUser));

    /* 1. Traer info del vehículo ---------------------------------- */
    fetch(`${import.meta.env.VITE_API_URL}/vehiculos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Vehículo no encontrado");
        return r.json();
      })
      .then((vehiculo) => setVehiculoData(vehiculo))
      .catch(() => navigate("/vehiculos-cliente"));   // sólo si realmente no existe

    /* 2. Traer reparaciones del vehículo --------------------------- */
    fetch(`${import.meta.env.VITE_API_URL}/reparaciones/vehiculo/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setReparaciones(data))          // puede ser []
      .catch((err) => console.error(err));
  }, [id, navigate]);

  // Estilos inline para asegurar que funcione sin Tailwind
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  }

  const sidebarStyle = {
    width: "280px",
    backgroundColor: "#2D3573",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "0",
  }

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  }

  const logoCircleStyle = {
    width: "120px",
    height: "120px",
    //backgroundColor: "white",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //padding: "1rem",
  }

  const logoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  }

  const menuSectionStyle = {
    flex: 1,
    padding: "1rem 0",
  }

  const menuTitleStyle = {
    padding: "1rem 1.5rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "0.5rem",
  }

  const menuItemStyle = {
    display: "block",
    padding: "1rem 1.5rem",
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    borderLeft: "4px solid transparent",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }

  const activeMenuItemStyle = {
    ...menuItemStyle,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderLeftColor: "white",
    fontWeight: "600",
  }

  const logoutStyle = {
    padding: "1.5rem",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  }

  const logoutButtonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  }

  const mainContentStyle = {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#f8f9fa",
  }

  const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    color: "#2D3573",
    textDecoration: "none",
    fontSize: "1rem",
    marginBottom: "1rem",
    cursor: "pointer",
  }

  const headerStyle = {
    marginBottom: "2rem",
  }

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 0.5rem 0",
  }

  const subtitleStyle = {
    fontSize: "1.25rem",
    color: "#6b7280",
    margin: "0 0 0.5rem 0",
  }

  const sectionTitleStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#374151",
    margin: "2rem 0 1.5rem 0",
  }

  const reparacionCardStyle = {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",
  }

  const reparacionTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 0.5rem 0",
  }

  const reparacionDetailStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    margin: "0.25rem 0",
  }

  const statusContainerStyle = {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    textAlign: "right",
  }

  const getStatusStyle = (status) => {
    let color = "#2D3573" // Default blue

    if (status.toLowerCase().includes("rechazado")) {
      color = "#DC2626" // Red for rejected
    } else if (status.toLowerCase().includes("pendiente")) {
      color = "#F59E0B" // Yellow for pending
    } else if (status.toLowerCase().includes("curso")) {
      color = "#3B82F6" // Blue for in progress
    }

    return {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: color,
      marginBottom: "0.5rem",
    }
  }

  const valorStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#374151",
  }

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isAuthenticated")

    // Redirigir al login
    navigate("/")
  }

  const handleMenuClick = (menu) => {
    if (menu === "perfil") {
      navigate("/dashboard-cliente")
    } else if (menu === "vehiculos") {
      navigate("/vehiculos-cliente")
    } else {
      setActiveMenu(menu)
    }
  }

  const handleReparacionClick = (reparacionId) => {
    navigate(`/servicios-cliente/${id}/${reparacionId}`)
  }

  // Si no hay datos del usuario o vehículo, mostrar loading
  if (!userData || !vehiculoData) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div>Cargando...</div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Logo */}
        <div style={logoContainerStyle}>
          <div style={logoCircleStyle}>
            <img
              src="/Logo.png"
              alt="AutoCare Manager"
              style={logoStyle}
              onError={(e) => {
                e.target.onerror = null
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iNDAiIGZpbGw9IiMyRDM1NzMiLz4KPHRleHQgeD0iNDAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BQzwvdGV4dD4KPC9zdmc+"
              }}
            />
          </div>
        </div>

        {/* Menu */}
        <div style={menuSectionStyle}>
          <div style={menuTitleStyle}>Cliente</div>

          <div
            style={activeMenu === "vehiculos" ? activeMenuItemStyle : menuItemStyle}
            onClick={() => handleMenuClick("vehiculos")}
          >
            Menu vehículos
          </div>

          <div
            style={activeMenu === "perfil" ? activeMenuItemStyle : menuItemStyle}
            onClick={() => handleMenuClick("perfil")}
          >
            Menu Perfil
          </div>
        </div>

        {/* Logout */}
        <div style={logoutStyle}>
          <button
            style={logoutButtonStyle}
            onClick={handleLogout}
            onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Back Button */}
        <div style={backButtonStyle} onClick={() => navigate("/vehiculos-cliente")}>
          &lt; Menú Vehículos
        </div>

        {/* Header del vehículo */}
        <h1 style={titleStyle}>
          {vehiculoData?.marca} {vehiculoData?.modelo}
        </h1>
        <p style={subtitleStyle}>Placa: {vehiculoData?.placa}</p>
        
        {/* Reparaciones Section */}
        <h2 style={sectionTitleStyle}>Registro de Reparaciones</h2>

        {/* Lista de reparaciones */}
        {reparaciones.length === 0 ? (
          <p>No hay reparaciones registradas para este vehículo.</p>
        ) : (
          reparaciones.map((rep) => (
            <div key={rep.id} style={reparacionCardStyle}
              onClick={() => handleReparacionClick(rep.id)}>
              <h3 style={reparacionTitleStyle}>Reparación #{rep.id}</h3>
              <p style={reparacionDetailStyle}>
                Inicio: {new Date(rep.fecha_inicio).toLocaleDateString()}
              </p>
              <p style={reparacionDetailStyle}>
                Fin:&nbsp;
                {rep.fecha_fin ? new Date(rep.fecha_fin).toLocaleDateString() : "----"}
              </p>
              <div style={statusContainerStyle}>
                <p style={getStatusStyle(rep.status)}>Status: {rep.status}</p>
                <p style={valorStyle}>Valor: ${Number(rep.precio).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ReparacionesCliente
