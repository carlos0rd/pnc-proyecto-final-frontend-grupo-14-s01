"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GestionVehiculos = () => {
  const [activeMenu, setActiveMenu] = useState("vehiculos")
  const [userData, setUserData] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedVehiculo, setSelectedVehiculo] = useState(null)
  const [editFormData, setEditFormData] = useState({
    modelo: "",
    marca: "",
    año: "",
    color: "",
    placa: "",
  })
  const navigate = useNavigate()

  // Datos de vehículos quemados para el ejemplo
  const vehiculosData = [
    {
      id: 1,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2021",
      color: "Blanco",
      placa: "ABC-1234",
      propietario: "Juan Pérez",
    },
    {
      id: 2,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2020",
      color: "Negro",
      placa: "DEF-5678",
      propietario: "María García",
    },
    {
      id: 3,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2022",
      color: "Rojo",
      placa: "GHI-9012",
      propietario: "Carlos López",
    },
    {
      id: 4,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2021",
      color: "Azul",
      placa: "JKL-3456",
      propietario: "Ana Martínez",
    },
    {
      id: 5,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2023",
      color: "Gris",
      placa: "MNO-7890",
      propietario: "Luis Rodríguez",
    },
    {
      id: 6,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2020",
      color: "Blanco",
      placa: "PQR-1234",
      propietario: "Elena Fernández",
    },
    {
      id: 7,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2022",
      color: "Negro",
      placa: "STU-5678",
      propietario: "Miguel Torres",
    },
    {
      id: 8,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2021",
      color: "Plata",
      placa: "VWX-9012",
      propietario: "Carmen Ruiz",
    },
    {
      id: 9,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2023",
      color: "Rojo",
      placa: "YZA-3456",
      propietario: "Roberto Silva",
    },
    {
      id: 10,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2020",
      color: "Azul",
      placa: "BCD-7890",
      propietario: "Patricia Morales",
    },
    {
      id: 11,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2022",
      color: "Verde",
      placa: "EFG-1234",
      propietario: "Fernando Castro",
    },
    {
      id: 12,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2021",
      color: "Blanco",
      placa: "HIJ-5678",
      propietario: "Lucía Herrera",
    },
    {
      id: 13,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2023",
      color: "Negro",
      placa: "KLM-9012",
      propietario: "Diego Vargas",
    },
    {
      id: 14,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2020",
      color: "Gris",
      placa: "NOP-3456",
      propietario: "Sofía Mendoza",
    },
    {
      id: 15,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2022",
      color: "Rojo",
      placa: "QRS-7890",
      propietario: "Andrés Jiménez",
    },
    {
      id: 16,
      marca: "Chevrolet",
      modelo: "Onix",
      año: "2021",
      color: "Azul",
      placa: "TUV-1234",
      propietario: "Valeria Ortega",
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
    if (user.rol_id !== 3) {
      navigate("/dashboard-cliente")
      return
    }

    setUserData(user)
  }, [navigate])

  // Filtrar vehículos basado en el término de búsqueda
  const filteredVehiculos = vehiculosData.filter(
    (vehiculo) =>
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log("Guardando vehículo:", editFormData)
    // Aquí implementarías la lógica para guardar los cambios
    setShowEditModal(false)
    alert("Vehículo actualizado exitosamente")
  }

  const handleDeleteVehiculo = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      console.log("Eliminando vehículo:", selectedVehiculo.id)
      // Aquí implementarías la lógica para eliminar el vehículo
      setShowEditModal(false)
      alert("Vehículo eliminado exitosamente")
    }
  }

  // Estilos inline
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  }

  const sidebarStyle = {
    width: "280px",
    backgroundColor: "#038C3E",
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

  const adminLabelStyle = {
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
    marginBottom: "2rem",
  }

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 2rem 0",
    letterSpacing: "0.02em",
  }

  const searchContainerStyle = {
    position: "relative",
    marginBottom: "2rem",
    maxWidth: "500px",
  }

  const searchInputStyle = {
    width: "100%",
    padding: "1rem 1rem 1rem 3rem",
    fontSize: "1rem",
    border: "2px solid #4ADE80",
    borderRadius: "25px",
    backgroundColor: "#4ADE80",
    color: "white",
    outline: "none",
  }

  const searchIconStyle = {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    fontSize: "1.2rem",
  }

  const vehiculosGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    maxWidth: "800px",
  }

  const vehiculoCardStyle = {
    backgroundColor: "#2D3573",
    borderRadius: "25px",
    padding: "1rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    minHeight: "60px",
  }

  const vehiculoInfoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  }

  const vehiculoIconStyle = {
    fontSize: "1.5rem",
  }

  const vehiculoNameStyle = {
    fontSize: "1rem",
    fontWeight: "500",
  }

  const editButtonStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "15px",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
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
    maxWidth: "500px",
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

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "2rem",
  }

  const saveButtonStyle = {
    padding: "0.75rem 2rem",
    backgroundColor: "#2D3573",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }

  const deleteButtonStyle = {
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
    setActiveMenu(menu)
    if (menu === "perfil") {
      navigate("/dashboard-admin")
    } else if (menu === "usuarios") {
      navigate("/gestion-usuarios")
    }
  }

  const handleEditVehiculo = (vehiculo) => {
    setSelectedVehiculo(vehiculo)
    setEditFormData({
      modelo: vehiculo.modelo,
      marca: vehiculo.marca,
      año: vehiculo.año,
      color: vehiculo.color,
      placa: vehiculo.placa,
    })
    setShowEditModal(true)
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
          <div style={adminLabelStyle}>Admin</div>
        </div>

        {/* Menu */}
        <div style={menuSectionStyle}>
          <div
            style={activeMenu === "perfil" ? activeMenuItemStyle : menuItemStyle}
            onClick={() => handleMenuClick("perfil")}
          >
            Menu Perfil
          </div>

          <div
            style={activeMenu === "usuarios" ? activeMenuItemStyle : menuItemStyle}
            onClick={() => handleMenuClick("usuarios")}
          >
            usuarios
          </div>

          <div
            style={activeMenu === "vehiculos" ? activeMenuItemStyle : menuItemStyle}
            onClick={() => handleMenuClick("vehiculos")}
          >
            vehiculos
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
          <h1 style={titleStyle}>GESTION DE VEHICULOS</h1>

          {/* Search Bar */}
          <div style={searchContainerStyle}>
            <div style={searchIconStyle}>🔍</div>
            <input
              type="text"
              placeholder="Ingresar marca de vehiculo"
              style={searchInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Vehiculos Grid */}
        <div style={vehiculosGridStyle}>
          {filteredVehiculos.map((vehiculo) => (
            <div key={vehiculo.id} style={vehiculoCardStyle}>
              <div style={vehiculoInfoStyle}>
                <span style={vehiculoIconStyle}>🚗</span>
                <span style={vehiculoNameStyle}>
                  {vehiculo.marca} {vehiculo.modelo}
                </span>
              </div>
              <button
                style={editButtonStyle}
                onClick={() => handleEditVehiculo(vehiculo)}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(255,255,255,0.1)"
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent"
                }}
              >
                EDITAR
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edición de Vehículo */}
      {showEditModal && (
        <div style={modalOverlayStyle} onClick={() => setShowEditModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h2 style={modalTitleStyle}>EDITAR VEHICULO</h2>
              <p style={modalSubtitleStyle}>Editar datos de un vehiculo</p>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="modelo"
                  value={editFormData.modelo}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Modelo del vehiculo"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="marca"
                  value={editFormData.marca}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Marca"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="año"
                  value={editFormData.año}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Año"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="color"
                  value={editFormData.color}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Color"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="placa"
                  value={editFormData.placa}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Placa"
                  required
                />
              </div>

              {/* Buttons */}
              <div style={buttonContainerStyle}>
                <button
                  type="submit"
                  style={saveButtonStyle}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#1e2550")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#2D3573")}
                >
                  GUARDAR
                </button>
                <button
                  type="button"
                  style={deleteButtonStyle}
                  onClick={handleDeleteVehiculo}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#4b5563")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#6b7280")}
                >
                  Eliminar vehiculo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionVehiculos
