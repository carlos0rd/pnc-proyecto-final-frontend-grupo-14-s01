"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ServiciosCliente = () => {
  const [activeMenu, setActiveMenu] = useState("vehiculos")
  const [userData, setUserData] = useState(null)
  const [vehiculoData, setVehiculoData] = useState(null)
  const [reparacionData, setReparacionData] = useState(null)
  const navigate = useNavigate()
  const { vehiculoId, reparacionId } = useParams()

  // Datos de vehículos quemados para el ejemplo
  const vehiculosData = [
    {
      id: 1,
      marca: "Chevrolet",
      modelo: "Onix",
      placa: "ABC-1234",
      mecanico: "Juan",
      imagen:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      marca: "Toyota",
      modelo: "Corolla",
      placa: "DEF-5678",
      mecanico: "Pedro",
      imagen:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      marca: "Honda",
      modelo: "Civic",
      placa: "GHI-9012",
      mecanico: "Carlos",
      imagen:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ]

  // Use the same reparacionesData array as in ReparacionesCliente
  const reparacionesData = [
    // Reparaciones para Vehículo 1 (Chevrolet Onix ABC-1234)
    {
      id: "0001",
      vehiculoId: 1,
      fechaInicio: "20/09/2021",
      fechaFinalizacion: "----",
      status: "En curso",
      valor: "$ 3.872,28",
      servicios: [
        {
          nombre: "Cambio de ruedas",
          descripcion: "Reemplace las ruedas estándar con ruedas personalizadas",
          fechaInicio: "20/09/2021",
          fechaFinalizacion: "----",
          status: "Finalizado",
          valor: "$ 820,76",
        },
        {
          nombre: "Cambio de aceite",
          descripcion: "Cambio de aceite y filtro",
          fechaInicio: "20/09/2021",
          fechaFinalizacion: "----",
          status: "En curso",
          valor: "$ 150,00",
        },
        {
          nombre: "Revisión de frenos",
          descripcion: "Revisión y ajuste del sistema de frenos",
          fechaInicio: "20/09/2021",
          fechaFinalizacion: "----",
          status: "Pendiente",
          valor: "$ 2.901,52",
        },
      ],
    },
    {
      id: "0002",
      vehiculoId: 1,
      fechaInicio: "20/09/2021",
      fechaFinalizacion: "----",
      status: "Rechazado por el cliente",
      valor: "$ 872,28",
      servicios: [
        {
          nombre: "Cambio de batería",
          descripcion: "Reemplazo de batería agotada",
          fechaInicio: "20/09/2021",
          fechaFinalizacion: "----",
          status: "Rechazado",
          valor: "$ 872,28",
        },
      ],
    },
    {
      id: "0003",
      vehiculoId: 1,
      fechaInicio: "20/09/2021",
      fechaFinalizacion: "----",
      status: "Pendiente",
      valor: "$ 3.872,28",
      servicios: [
        {
          nombre: "Alineación y balanceo",
          descripcion: "Alineación de dirección y balanceo de ruedas",
          fechaInicio: "20/09/2021",
          fechaFinalizacion: "----",
          status: "Pendiente",
          valor: "$ 1.200,00",
        },
        {
          nombre: "Cambio de amortiguadores",
          descripcion: "Reemplazo de amortiguadores delanteros y traseros",
          fechaInicio: "20/09/2021",
          fechaFinalizacion: "----",
          status: "Pendiente",
          valor: "$ 2.672,28",
        },
      ],
    },
    // Reparaciones para Vehículo 2 (Toyota Corolla DEF-5678)
    {
      id: "0004",
      vehiculoId: 2,
      fechaInicio: "15/10/2021",
      fechaFinalizacion: "20/10/2021",
      status: "Finalizado",
      valor: "$ 2.500,00",
      servicios: [
        {
          nombre: "Mantenimiento general",
          descripcion: "Revisión completa del vehículo y cambio de filtros",
          fechaInicio: "15/10/2021",
          fechaFinalizacion: "20/10/2021",
          status: "Finalizado",
          valor: "$ 2.500,00",
        },
      ],
    },
    {
      id: "0005",
      vehiculoId: 2,
      fechaInicio: "05/11/2021",
      fechaFinalizacion: "----",
      status: "En curso",
      valor: "$ 1.800,00",
      servicios: [
        {
          nombre: "Reparación de transmisión",
          descripcion: "Revisión y reparación del sistema de transmisión",
          fechaInicio: "05/11/2021",
          fechaFinalizacion: "----",
          status: "En curso",
          valor: "$ 1.800,00",
        },
      ],
    },
    // Reparaciones para Vehículo 3 (Honda Civic GHI-9012)
    {
      id: "0006",
      vehiculoId: 3,
      fechaInicio: "01/12/2021",
      fechaFinalizacion: "----",
      status: "Pendiente",
      valor: "$ 950,00",
      servicios: [
        {
          nombre: "Cambio de llantas",
          descripcion: "Reemplazo de las cuatro llantas del vehículo",
          fechaInicio: "01/12/2021",
          fechaFinalizacion: "----",
          status: "Pendiente",
          valor: "$ 950,00",
        },
      ],
    },
    {
      id: "0007",
      vehiculoId: 3,
      fechaInicio: "10/12/2021",
      fechaFinalizacion: "----",
      status: "En curso",
      valor: "$ 3.200,00",
      servicios: [
        {
          nombre: "Reparación de motor",
          descripcion: "Revisión completa y reparación del motor",
          fechaInicio: "10/12/2021",
          fechaFinalizacion: "----",
          status: "En curso",
          valor: "$ 2.000,00",
        },
        {
          nombre: "Cambio de sistema eléctrico",
          descripcion: "Actualización del sistema eléctrico del vehículo",
          fechaInicio: "10/12/2021",
          fechaFinalizacion: "----",
          status: "Pendiente",
          valor: "$ 1.200,00",
        },
      ],
    },
  ]

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

    // Buscar el vehículo por ID
    const vehiculo = vehiculosData.find((v) => v.id === Number.parseInt(vehiculoId))
    if (!vehiculo) {
      // Si no se encuentra el vehículo, redirigir a la lista de vehículos
      navigate("/vehiculos-cliente")
      return
    }
    setVehiculoData(vehiculo)

    // Buscar la reparación por ID
    const reparacion = reparacionesData.find(
      (r) => r.id === reparacionId && r.vehiculoId === Number.parseInt(vehiculoId),
    )
    if (!reparacion) {
      // Si no se encuentra la reparación, redirigir a la lista de reparaciones
      navigate(`/reparaciones-cliente/${vehiculoId}`)
      return
    }
    setReparacionData(reparacion)
  }, [vehiculoId, reparacionId, navigate])

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
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  }

  const logoStyle = {
    width: "80px",
    height: "80px",
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

  const infoRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "1rem",
  }

  const sectionTitleStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#374151",
    margin: "2rem 0 1.5rem 0",
  }

  const servicioCardStyle = {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    position: "relative",
  }

  const servicioTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 0.5rem 0",
  }

  const servicioDescriptionStyle = {
    fontSize: "1rem",
    color: "#4B5563",
    margin: "0 0 1rem 0",
  }

  const servicioDetailStyle = {
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
    } else if (status.toLowerCase().includes("finalizado")) {
      color = "#10B981" // Green for completed
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

  // Si no hay datos del usuario, vehículo o reparación, mostrar loading
  if (!userData || !vehiculoData || !reparacionData) {
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
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iNDAiIGZpbGw9IiMyRDM1NzMiLz4KPHRleHQgeD0iNDAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0X2FuY2hvcj0ibWlkZGxlIj5BQzwvdGV4dD4KPC9zdmc+"
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
        <div style={backButtonStyle} onClick={() => navigate(`/reparaciones-cliente/${vehiculoId}`)}>
          &lt; {vehiculoData.marca} {vehiculoData.modelo}
        </div>

        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Reparación #{reparacionData.id}</h1>
          <p style={subtitleStyle}>
            {vehiculoData.marca} {vehiculoData.modelo}
          </p>
          <p style={subtitleStyle}>Placa: {vehiculoData.placa}</p>

          <div style={infoRowStyle}>
            <span>Fecha de Inicio: {reparacionData.fechaInicio}</span>
            <span>Fecha de Finalización: {reparacionData.fechaFinalizacion}</span>
          </div>
        </div>

        {/* Servicios Section */}
        <h2 style={sectionTitleStyle}>Servicios</h2>

        {/* Lista de Servicios */}
        {reparacionData.servicios.map((servicio, index) => (
          <div key={index} style={servicioCardStyle}>
            <h3 style={servicioTitleStyle}>{servicio.nombre}</h3>
            <p style={servicioDescriptionStyle}>Descripción: {servicio.descripcion}</p>
            <p style={servicioDetailStyle}>Fecha de Inicio: {servicio.fechaInicio}</p>
            <p style={servicioDetailStyle}>Fecha de Finalización: {servicio.fechaFinalizacion}</p>

            <div style={statusContainerStyle}>
              <p style={getStatusStyle(servicio.status)}>Status: {servicio.status}</p>
              <p style={valorStyle}>Valor: {servicio.valor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiciosCliente
