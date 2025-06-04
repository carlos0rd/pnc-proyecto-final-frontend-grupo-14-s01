"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ServiciosClienteDesdeMecanico = () => {
  const [activeMenu, setActiveMenu] = useState("reparaciones")
  const [userData, setUserData] = useState(null)
  const [vehiculoData, setVehiculoData] = useState(null)
  const [reparacionData, setReparacionData] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedServicio, setSelectedServicio] = useState(null)
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    status: "",
    valor: "",
  })
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

  // Datos de reparaciones quemados para el ejemplo
  const reparacionesData = [
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
    // Reparaciones para otros vehículos...
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
  ]

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const currentUser = localStorage.getItem("currentUser")

    if (!isAuthenticated || !currentUser) {
      navigate("/")
      return
    }

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
    const vehiculo = vehiculosData.find((v) => v.id === Number.parseInt(vehiculoId))
    if (!vehiculo) {
      navigate("/vehiculos-mecanico")
      return
    }
    setVehiculoData(vehiculo)

    // Buscar la reparación por ID
    const reparacion = reparacionesData.find(
      (r) => r.id === reparacionId && r.vehiculoId === Number.parseInt(vehiculoId),
    )
    if (!reparacion) {
      navigate(`/reparaciones-mecanico/${vehiculoId}`)
      return
    }
    setReparacionData(reparacion)
  }, [vehiculoId, reparacionId, navigate])

  // Estilos inline
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  }

  const sidebarStyle = {
    width: "280px",
    backgroundColor: "#22c55e",
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

  const editButtonStyle = {
    backgroundColor: "transparent",
    color: "#2D3573",
    border: "1px solid #2D3573",
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "0.5rem",
    transition: "all 0.3s ease",
  }

  const getStatusStyle = (status) => {
    let color = "#2D3573"

    if (status.toLowerCase().includes("rechazado")) {
      color = "#DC2626"
    } else if (status.toLowerCase().includes("pendiente")) {
      color = "#F59E0B"
    } else if (status.toLowerCase().includes("finalizado")) {
      color = "#10B981"
    } else if (status.toLowerCase().includes("curso")) {
      color = "#3B82F6"
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

  // Estilos para el modal
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  }

  const modalStyle = {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    position: "relative",
  }

  const modalHeaderStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  }

  const modalTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 0.5rem 0",
  }

  const modalSubtitleStyle = {
    fontSize: "1rem",
    color: "#6b7280",
  }

  const formGroupStyle = {
    marginBottom: "1rem",
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  }

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  }

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "2rem",
  }

  const saveButtonStyle = {
    padding: "0.75rem 2rem",
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }

  const cancelButtonStyle = {
    padding: "0.75rem 2rem",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isAuthenticated")
    navigate("/")
  }

  const handleMenuClick = (menu) => {
    if (menu === "perfil") {
      navigate("/dashboard-mecanico")
    } else {
      setActiveMenu(menu)
    }
  }

  const handleEditServicio = (servicio, index) => {
    setSelectedServicio({ ...servicio, index })
    setEditFormData({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      fechaInicio: servicio.fechaInicio,
      fechaFinalizacion: servicio.fechaFinalizacion,
      status: servicio.status,
      valor: servicio.valor,
    })
    setShowEditModal(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log("Guardando servicio:", editFormData)
    // Aquí implementarías la lógica para guardar los cambios
    setShowEditModal(false)
    alert("Servicio actualizado exitosamente")
  }

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
        <div style={backButtonStyle} onClick={() => navigate(`/reparaciones-mecanico/${vehiculoId}`)}>
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
              <button
                style={editButtonStyle}
                onClick={() => handleEditServicio(servicio, index)}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#2D3573"
                  e.target.style.color = "white"
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"
                  e.target.style.color = "#2D3573"
                }}
              >
                Editar
              </button>
              <p style={getStatusStyle(servicio.status)}>Status: {servicio.status}</p>
              <p style={valorStyle}>Valor: {servicio.valor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edición de Servicio */}
      {showEditModal && (
        <div style={modalOverlayStyle} onClick={() => setShowEditModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h2 style={modalTitleStyle}>Editar Servicio</h2>
              <p style={modalSubtitleStyle}>Modificar los detalles del servicio</p>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="nombre"
                  value={editFormData.nombre}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Nombre del servicio"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <textarea
                  name="descripcion"
                  value={editFormData.descripcion}
                  onChange={handleEditChange}
                  style={textareaStyle}
                  placeholder="Descripción del servicio"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="fechaInicio"
                  value={editFormData.fechaInicio}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Fecha de inicio (DD/MM/YYYY)"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="fechaFinalizacion"
                  value={editFormData.fechaFinalizacion}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Fecha de finalización (DD/MM/YYYY o ----)"
                />
              </div>

              <div style={formGroupStyle}>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditChange}
                  style={selectStyle}
                  required
                >
                  <option value="">Seleccionar status</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En curso">En curso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="valor"
                  value={editFormData.valor}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Valor ($ 0.00)"
                  required
                />
              </div>

              <div style={buttonContainerStyle}>
                <button
                  type="submit"
                  style={saveButtonStyle}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#16a34a")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#22c55e")}
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  style={cancelButtonStyle}
                  onClick={() => setShowEditModal(false)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#4b5563")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#6b7280")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiciosClienteDesdeMecanico