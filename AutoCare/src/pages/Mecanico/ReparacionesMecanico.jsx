"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ReparacionesMecanico = () => {
  const [activeMenu, setActiveMenu] = useState("reparaciones")
  const [userData, setUserData] = useState(null)
  const [vehiculoData, setVehiculoData] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  // Datos de vehículos quemados para el ejemplo
  const vehiculosData = [
    {
      id: 1,
      marca: "Chevrolet",
      modelo: "Onix",
      placa: "ABC-1234",
      mecanico: "Juan",
      cliente: "Juan",
      imagen:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      marca: "Toyota",
      modelo: "Corolla",
      placa: "DEF-5678",
      mecanico: "Juan",
      cliente: "Pedro",
      imagen:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      marca: "Honda",
      modelo: "Civic",
      placa: "GHI-9012",
      mecanico: "Juan",
      cliente: "Carlos",
      imagen:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ]

  // Datos de reparaciones quemados para el ejemplo
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
    const user = JSON.parse(currentUser)
    if (user.role !== "mecanico") {
      if (user.role === "admin" || user.email.includes("admin")) {
        navigate("/dashboard-admin")
      } else {
        navigate("/dashboard-cliente")
      }
      return
    }

    setUserData(user)

    // Buscar el vehículo por ID
    const vehiculo = vehiculosData.find((v) => v.id === Number.parseInt(id))
    if (vehiculo) {
      setVehiculoData(vehiculo)
    } else {
      // Si no se encuentra el vehículo, redirigir a la lista de vehículos
      navigate("/vehiculos-mecanico")
    }
  }, [id, navigate])

  // Estilos inline para asegurar que funcione sin Tailwind
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  }

  const sidebarStyle = {
    width: "280px",
    backgroundColor: "#22c55e", // Verde para mecánico
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "0",
  }

  const logoContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem 1rem 1rem",
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
    marginBottom: "1rem",
  }

  const logoStyle = {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  }

  const mecanicoLabelStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: "1rem",
  }

  const menuSectionStyle = {
    flex: 1,
    padding: "1rem 0",
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
    backgroundColor: "transparent",
  }

  const activeMenuItemStyle = {
    ...menuItemStyle,
    backgroundColor: "rgba(255,255,255,0.2)",
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
      navigate("/dashboard-mecanico")
    } else if (menu === "reparaciones") {
      navigate("/vehiculos-mecanico")
    } else {
      setActiveMenu(menu)
    }
  }

  const handleReparacionClick = (reparacionId) => {
    navigate(`/servicios-mecanico/${id}/${reparacionId}`)
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
          <div style={mecanicoLabelStyle}>Mecanico</div>
        </div>

        {/* Menu */}
        <div style={menuSectionStyle}>
          <div
            style={activeMenu === "reparaciones" ? activeMenuItemStyle : menuItemStyle}
            onClick={() => handleMenuClick("reparaciones")}
          >
            Reparaciones
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
            Cerrar sesion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Back Button */}
        <div style={backButtonStyle} onClick={() => navigate("/vehiculos-mecanico")}>
          &lt; Menú Vehículos
        </div>

        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            {vehiculoData.marca} {vehiculoData.modelo}
          </h1>
          <p style={subtitleStyle}>Placa: {vehiculoData.placa}</p>
        </div>

        {/* Reparaciones Section */}
        <h2 style={sectionTitleStyle}>Registro de Reparaciones</h2>

        {/* Lista de Reparaciones */}
        {reparacionesData
          .filter((reparacion) => reparacion.vehiculoId === vehiculoData.id)
          .map((reparacion) => (
            <div
              key={reparacion.id}
              style={reparacionCardStyle}
              onClick={() => handleReparacionClick(reparacion.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={reparacionTitleStyle}>Reparación #{reparacion.id}</h3>
              <p style={reparacionDetailStyle}>Fecha de Inicio: {reparacion.fechaInicio}</p>
              <p style={reparacionDetailStyle}>Fecha de Finalización: {reparacion.fechaFinalizacion}</p>

              <div style={statusContainerStyle}>
                <p style={getStatusStyle(reparacion.status)}>Status: {reparacion.status}</p>
                <p style={valorStyle}>Valor: {reparacion.valor}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ReparacionesMecanico