"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const VehiculosCliente = () => {
  const [activeMenu, setActiveMenu] = useState("vehiculos")
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  // Datos de vehículos quemados para el ejemplo
  const [vehiculosData, setVehiculosData] = useState([]);

useEffect(() => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const currentUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");

  if (!isAuthenticated || !currentUser) {
    navigate("/");
    return;
  }

  const user = JSON.parse(currentUser);
  setUserData(user);

  // Obtener vehículos del backend
  fetch(`${import.meta.env.VITE_API_URL}/vehiculos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener vehículos");
      return res.json();
    })
   .then((data) => {
   // ajusta al formato que realmente necesites
   const lista = Array.isArray(data) ? data                // ← el backend devuelve un array
               : Array.isArray(data.data) ? data.data      // ← backend devuelve { data:[…] }
               : [];                                       // ← cualquier otro caso
   setVehiculosData(lista);
 })
    .catch((err) => console.error(err));
}, [navigate]);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const currentUser = localStorage.getItem("currentUser")

    if (!isAuthenticated || !currentUser) {
      // Si no está autenticado, redirigir al login
      navigate("/")
      return
    }

    // Cargar datos del usuario
    setUserData(JSON.parse(currentUser))
  }, [navigate])

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
    padding: "3rem",
    backgroundColor: "#f8f9fa",
  }

  const headerStyle = {
    marginBottom: "3rem",
  }

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0",
    letterSpacing: "0.02em",
  }

  const vehiculosContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  }

  const vehiculoCardStyle = {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  }

  const vehiculoImageStyle = {
    width: "120px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "0.375rem",
  }

  const vehiculoInfoStyle = {
    flex: 1,
  }

  const vehiculoNombreStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 0.5rem 0",
  }

  const vehiculoDetalleStyle = {
    fontSize: "1rem",
    color: "#6b7280",
    margin: "0.25rem 0",
  }

  const vehiculoActionsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  }

  const visualizarLinkStyle = {
    color: "#2D3573",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
  }

  const settingsIconStyle = {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    color: "#6b7280",
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
    } else {
      setActiveMenu(menu)
    }
  }

  const handleVerReparaciones = (vehiculoId) => {
    navigate(`/reparaciones-cliente/${vehiculoId}`)
  }

  // Si no hay datos del usuario, mostrar loading
  if (!userData) {
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
        <div style={headerStyle}>
          <h1 style={titleStyle}>Menú Vehículos</h1>
        </div>

        {vehiculosData.length === 0 && (
          <div style={{ textAlign: "center", color: "#6b7280", fontSize: "1.2rem" }}>
            No tienes vehículos registrados.
          </div>
        )}

        {/* Lista de Vehículos */}
        <div style={vehiculosContainerStyle}>
          {vehiculosData.map((vehiculo) => (
            <div key={vehiculo.id} style={vehiculoCardStyle}>
              <img
                src={vehiculo.imagen || "/placeholder.svg"}
                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                style={vehiculoImageStyle}
              />

              <div style={vehiculoInfoStyle}>
                <h3 style={vehiculoNombreStyle}>
                  {vehiculo.marca} {vehiculo.modelo}
                </h3>
                <p style={vehiculoDetalleStyle}>Placa: {vehiculo.placa}</p>
                <p style={vehiculoDetalleStyle}>Mecánico: {vehiculo.mecanico}</p>
              </div>

              <div style={vehiculoActionsStyle}>
                <div style={visualizarLinkStyle} onClick={() => handleVerReparaciones(vehiculo.id)}>
                  visualizar reparaciones
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VehiculosCliente
