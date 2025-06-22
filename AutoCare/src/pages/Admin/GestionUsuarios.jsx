"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GestionUsuarios = () => {
  const [activeMenu, setActiveMenu] = useState("usuarios")
  const [userData, setUserData] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mobile: "",
    role: "cliente",
  })
  const navigate = useNavigate()

  // Datos de usuarios quemados para el ejemplo
  const usuariosData = [
    {
      id: 1,
      name: "JUAN TRALALA",
      email: "juan1@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 2,
      name: "JUAN TRALALA",
      email: "leonardo@darede.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 3,
      name: "JUAN TRALALA",
      email: "juan3@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "mecanico",
    },
    {
      id: 4,
      name: "JUAN TRALALA",
      email: "juan4@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 5,
      name: "JUAN TRALALA",
      email: "juan5@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "admin",
    },
    {
      id: 6,
      name: "JUAN TRALALA",
      email: "juan6@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 7,
      name: "JUAN TRALALA",
      email: "juan7@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "mecanico",
    },
    {
      id: 8,
      name: "JUAN TRALALA",
      email: "juan8@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 9,
      name: "JUAN TRALALA",
      email: "juan9@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 10,
      name: "JUAN TRALALA",
      email: "juan10@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 11,
      name: "JUAN TRALALA",
      email: "juan11@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "mecanico",
    },
    {
      id: 12,
      name: "JUAN TRALALA",
      email: "juan12@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 13,
      name: "JUAN TRALALA",
      email: "juan13@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "admin",
    },
    {
      id: 14,
      name: "JUAN TRALALA",
      email: "juan14@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 15,
      name: "JUAN TRALALA",
      email: "juan15@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "cliente",
    },
    {
      id: 16,
      name: "JUAN TRALALA",
      email: "juan16@autocare.com",
      phone: "(+503) 5555-5555",
      mobile: "(+503) 2222-2222",
      role: "mecanico",
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

  // Filtrar usuarios basado en el término de búsqueda
  const filteredUsuarios = usuariosData.filter((usuario) =>
    usuario.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

  const handleRoleChange = (role) => {
    setEditFormData({
      ...editFormData,
      role: role,
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log("Guardando usuario:", editFormData)
    // Aquí implementarías la lógica para guardar los cambios
    setShowEditModal(false)
    alert("Usuario actualizado exitosamente")
  }

  const handleDeleteUser = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cuenta?")) {
      console.log("Eliminando usuario:", selectedUser.id)
      // Aquí implementarías la lógica para eliminar el usuario
      setShowEditModal(false)
      alert("Usuario eliminado exitosamente")
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

  const usersGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    maxWidth: "800px",
  }

  const userCardStyle = {
    backgroundColor: "#2D3573",
    borderRadius: "25px",
    padding: "1rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    minHeight: "60px",
  }

  const userInfoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  }

  const userIconStyle = {
    fontSize: "1.5rem",
  }

  const userNameStyle = {
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

  const roleContainerStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    justifyContent: "center",
  }

  const roleOptionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
  }

  const radioStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #d1d5db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }

  const radioSelectedStyle = {
    ...radioStyle,
    backgroundColor: "#2D3573",
    borderColor: "#2D3573",
  }

  const radioSelectedAdminStyle = {
    ...radioStyle,
    backgroundColor: "#038C3E",
    borderColor: "#038C3E",
  }

  const radioInnerStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "white",
  }

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
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
    } else if (menu === "vehiculos") {
      navigate("/gestion-vehiculos")
    }
  }

  const handleEditUser = (usuario) => {
    setSelectedUser(usuario)
    setEditFormData({
      name: usuario.name,
      email: usuario.email,
      phone: usuario.phone,
      mobile: usuario.mobile,
      role: usuario.role,
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
          <h1 style={titleStyle}>GESTION DE USUARIOS</h1>

          {/* Search Bar */}
          <div style={searchContainerStyle}>
            <div style={searchIconStyle}>🔍</div>
            <input
              type="text"
              placeholder="Ingresar nombre de usuario"
              style={searchInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Users Grid */}
        <div style={usersGridStyle}>
          {filteredUsuarios.map((usuario) => (
            <div key={usuario.id} style={userCardStyle}>
              <div style={userInfoStyle}>
                <span style={userIconStyle}>👤</span>
                <span style={userNameStyle}>{usuario.name}</span>
              </div>
              <button
                style={editButtonStyle}
                onClick={() => handleEditUser(usuario)}
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

      {/* Modal de Edición de Usuario */}
      {showEditModal && (
        <div style={modalOverlayStyle} onClick={() => setShowEditModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h2 style={modalTitleStyle}>EDITAR USUARIO</h2>
              <p style={modalSubtitleStyle}>Editar perfil de un usuario</p>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Email"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Teléfono"
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="tel"
                  name="mobile"
                  value={editFormData.mobile}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Celular"
                />
              </div>

              {/* Role Selection */}
              <div style={roleContainerStyle}>
                <div style={roleOptionStyle} onClick={() => handleRoleChange("cliente")}>
                  <div style={editFormData.role === "cliente" ? radioSelectedStyle : radioStyle}>
                    {editFormData.role === "cliente" && <div style={radioInnerStyle} />}
                  </div>
                  <span>Cliente</span>
                </div>

                <div style={roleOptionStyle} onClick={() => handleRoleChange("mecanico")}>
                  <div style={editFormData.role === "mecanico" ? radioSelectedStyle : radioStyle}>
                    {editFormData.role === "mecanico" && <div style={radioInnerStyle} />}
                  </div>
                  <span>Mecanico</span>
                </div>

                <div style={roleOptionStyle} onClick={() => handleRoleChange("admin")}>
                  <div style={editFormData.role === "admin" ? radioSelectedAdminStyle : radioStyle}>
                    {editFormData.role === "admin" && <div style={radioInnerStyle} />}
                  </div>
                  <span>Admin</span>
                </div>
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
                  onClick={handleDeleteUser}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#4b5563")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#6b7280")}
                >
                  Eliminar cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionUsuarios
