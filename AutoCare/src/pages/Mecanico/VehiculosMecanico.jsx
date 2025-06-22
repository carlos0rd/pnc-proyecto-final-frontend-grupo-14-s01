"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const VehiculosMecanico = () => {
  const [activeMenu, setActiveMenu] = useState("reparaciones")
  const [userData, setUserData] = useState(null)
  const [showDropdown, setShowDropdown] = useState(null) // Track which vehicle's dropdown is open
  const navigate = useNavigate()

  const [showAddModal, setShowAddModal] = useState(false)
  const [addFormData, setAddFormData] = useState({
    modelo: "",
    marca: "",
    año: "",
    color: "",
    placa: "",
    cliente: "",
    imagen: null,
  })

  // Datos de vehículos asignados al mecánico
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
      marca: "Chevrolet",
      modelo: "Onix",
      placa: "DEF-5678",
      mecanico: "Juan",
      cliente: "María",
      imagen:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      marca: "Chevrolet",
      modelo: "Onix",
      placa: "GHI-9012",
      mecanico: "Juan",
      cliente: "Carlos",
      imagen:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
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

    // Close dropdown when clicking outside
    const handleClickOutside = () => {
      setShowDropdown(null)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [navigate])

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
    padding: "3rem",
    backgroundColor: "#f8f9fa",
  }

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3rem",
  }

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0",
    letterSpacing: "0.02em",
  }

  const addButtonStyle = {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
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
    position: "relative",
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
    position: "relative",
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

  // Dropdown menu styles
  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "0.375rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    minWidth: "200px",
    marginTop: "0.5rem",
  }

  const dropdownItemStyle = {
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#374151",
    cursor: "pointer",
    borderBottom: "1px solid #f3f4f6",
    transition: "background-color 0.2s",
  }

  const dropdownItemHoverStyle = {
    backgroundColor: "#f9fafb",
  }

  const deleteItemStyle = {
    ...dropdownItemStyle,
    color: "#dc2626",
    borderBottom: "none",
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

  const handleVerReparaciones = (vehiculoId) => {
    navigate(`/reparaciones-mecanico/${vehiculoId}`)
  }

  const handleAgregarVehiculo = () => {
    setShowAddModal(true)
  }

  const handleSettingsClick = (e, vehiculoId) => {
    e.stopPropagation()
    setShowDropdown(showDropdown === vehiculoId ? null : vehiculoId)
  }

  const handleEditField = (vehiculoId, field) => {
    const vehiculo = vehiculosData.find((v) => v.id === vehiculoId)
    const currentValue = vehiculo[field]
    const newValue = prompt(`Editar ${field}:`, currentValue)

    if (newValue && newValue !== currentValue) {
      console.log(`Editando ${field} del vehículo ${vehiculoId}: ${currentValue} -> ${newValue}`)
      alert(`${field} actualizado exitosamente`)
    }
    setShowDropdown(null)
  }

  const handleDeleteVehicle = (vehiculoId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      console.log(`Eliminando vehículo ${vehiculoId}`)
      alert("Vehículo eliminado exitosamente")
    }
    setShowDropdown(null)
  }

  const handleAddChange = (e) => {
    const { name, value } = e.target
    setAddFormData({
      ...addFormData,
      [name]: value,
    })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    console.log("Agregando vehículo:", addFormData)
    setShowAddModal(false)
    setAddFormData({
      modelo: "",
      marca: "",
      año: "",
      color: "",
      placa: "",
      cliente: "",
      imagen: null,
    })
    alert("Vehículo agregado exitosamente")
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAddFormData({
        ...addFormData,
        imagen: file,
      })
    }
  }

  // Modal styles (keeping the existing add modal)
  const addModalStyle = {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    position: "relative",
  }

  const addModalHeaderStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  }

  const addModalContentStyle = {
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start",
  }

  const imageUploadSectionStyle = {
    flex: "0 0 200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  const imageUploadAreaStyle = {
    width: "150px",
    height: "120px",
    border: "2px dashed #d1d5db",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: "#f9fafb",
    marginBottom: "1rem",
  }

  const cameraIconStyle = {
    fontSize: "3rem",
    color: "#6b7280",
    marginBottom: "0.5rem",
  }

  const formSectionStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }

  const addButtonStyleModal = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#2D3573",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
  }

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
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
    margin: "0",
  }

  const inputStyle = {
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    color: "#374151",
    width: "100%",
    boxSizing: "border-box",
  }

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
        <div style={headerStyle}>
          <h1 style={titleStyle}>Menú Vehículos</h1>
          <button
            style={addButtonStyle}
            onClick={handleAgregarVehiculo}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#16a34a")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#22c55e")}
          >
            Agregar Vehiculo
          </button>
        </div>

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
                <p style={vehiculoDetalleStyle}>Cliente: {vehiculo.cliente}</p>
              </div>

              <div style={vehiculoActionsStyle}>
                <div style={visualizarLinkStyle} onClick={() => handleVerReparaciones(vehiculo.id)}>
                  visualizar reparaciones
                </div>
                <div style={{ position: "relative" }}>
                  <svg
                    style={settingsIconStyle}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => handleSettingsClick(e, vehiculo.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  {/* Dropdown Menu */}
                  {showDropdown === vehiculo.id && (
                    <div style={dropdownStyle}>
                      <div
                        style={dropdownItemStyle}
                        onClick={() => handleEditField(vehiculo.id, "modelo")}
                        onMouseOver={(e) => (e.target.style.backgroundColor = dropdownItemHoverStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                      >
                        ✏️ Editar Nombre
                      </div>
                      <div
                        style={dropdownItemStyle}
                        onClick={() => handleEditField(vehiculo.id, "placa")}
                        onMouseOver={(e) => (e.target.style.backgroundColor = dropdownItemHoverStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                      >
                        🏷️ Editar Placa
                      </div>
                      <div
                        style={dropdownItemStyle}
                        onClick={() => handleEditField(vehiculo.id, "mecanico")}
                        onMouseOver={(e) => (e.target.style.backgroundColor = dropdownItemHoverStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                      >
                        🔧 Editar Mecánico
                      </div>
                      <div
                        style={dropdownItemStyle}
                        onClick={() => handleEditField(vehiculo.id, "cliente")}
                        onMouseOver={(e) => (e.target.style.backgroundColor = dropdownItemHoverStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                      >
                        👤 Editar Cliente
                      </div>
                      <div
                        style={deleteItemStyle}
                        onClick={() => handleDeleteVehicle(vehiculo.id)}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#fef2f2")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                      >
                        🗑️ Eliminar Vehículo
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Agregar Vehículo */}
      {showAddModal && (
        <div style={modalOverlayStyle} onClick={() => setShowAddModal(false)}>
          <div style={addModalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={addModalHeaderStyle}>
              <h2 style={modalTitleStyle}>Agregar un nuevo vehículo</h2>
              <p style={modalSubtitleStyle}>Agregue la información de su vehículo</p>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div style={addModalContentStyle}>
                {/* Sección de imagen */}
                <div style={imageUploadSectionStyle}>
                  <div style={imageUploadAreaStyle} onClick={() => document.getElementById("imageInput").click()}>
                    <div style={cameraIconStyle}>📷</div>
                    <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Dos cam...</span>
                  </div>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <input
                    type="text"
                    name="cliente"
                    value={addFormData.cliente}
                    onChange={handleAddChange}
                    style={inputStyle}
                    placeholder="Nombre de usuario de cliente"
                    required
                  />
                </div>

                {/* Sección de formulario */}
                <div style={formSectionStyle}>
                  <input
                    type="text"
                    name="modelo"
                    value={addFormData.modelo}
                    onChange={handleAddChange}
                    style={inputStyle}
                    placeholder="Modelo del vehículo"
                    required
                  />

                  <input
                    type="text"
                    name="marca"
                    value={addFormData.marca}
                    onChange={handleAddChange}
                    style={inputStyle}
                    placeholder="Marca"
                    required
                  />

                  <input
                    type="text"
                    name="año"
                    value={addFormData.año}
                    onChange={handleAddChange}
                    style={inputStyle}
                    placeholder="Año"
                    required
                  />

                  <input
                    type="text"
                    name="color"
                    value={addFormData.color}
                    onChange={handleAddChange}
                    style={inputStyle}
                    placeholder="Color"
                    required
                  />

                  <input
                    type="text"
                    name="placa"
                    value={addFormData.placa}
                    onChange={handleAddChange}
                    style={inputStyle}
                    placeholder="Placa"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                style={addButtonStyleModal}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#1e2550")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2D3573")}
              >
                Agregar vehículo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VehiculosMecanico
