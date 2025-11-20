"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"; 
import { ok, warn, error as errorSwal } from "../../utils/alerts"

const ServiciosClienteDesdeMecanico = () => {
  const [activeMenu, setActiveMenu] = useState("reparaciones")
  const [userData, setUserData] = useState(null)
  const [vehiculoData, setVehiculoData] = useState(null)
  const [reparacionInfo, setReparacionInfo] = useState(null);   
  const [servicios,      setServicios]      = useState([]);     
  const [showEditModal,  setShowEditModal]  = useState(false);
  const [selectedServicio, setSelectedServicio] = useState(null)
  const [editFormData, setEditFormData] = useState({
    nombre_servicio: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    precio: "",
  })
  const navigate = useNavigate()
  const { vehiculoId, reparacionId } = useParams()

  // Estado para el modal de agregar servicio
  const [showAddModal, setShowAddModal]  = useState(false);
  const [addFormData,  setAddFormData]   = useState({
    nombre_servicio: "",
    descripcion:     "",
    fecha_inicio:    "",
    fecha_fin:       "",
    precio:          "",
  });

  useEffect(() => {
  // Verificar autenticación y rol del usuario
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const currentUser     = localStorage.getItem("currentUser");

  if (!isAuthenticated || !currentUser) {
    navigate("/");
    return;
  }

  const user = JSON.parse(currentUser);
  if (user.rol_id !== 2) {
    navigate(user.rol_id === 3 ? "/dashboard-admin" : "/dashboard-cliente");
    return;
  }
  setUserData(user);

  
  (async () => {
    try {
      const token = localStorage.getItem("token");

      
      const repRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/reparaciones/${reparacionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReparacionInfo(repRes.data);         

      const servRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/servicios/reparacion/${reparacionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServicios(Array.isArray(servRes.data) ? servRes.data : []);
      
      const vehRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehiculos/${vehiculoId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVehiculoData(vehRes.data);

    } catch (err) {
      console.error(err);
      navigate(`/reparaciones-mecanico/${vehiculoId}`);
    }
  })();
}, [vehiculoId, reparacionId, navigate]);

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
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const logoStyle = {
    width: "100%",
    height: "100%",
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
      nombre_servicio:  servicio.nombre_servicio,
      descripcion:      servicio.descripcion ?? "",
      fecha_inicio:     servicio.fecha_inicio?.slice(0,10) ?? "",
      fecha_fin:        servicio.fecha_fin?.slice(0,10)    ?? "",
      precio:           servicio.precio,
    })
    setShowEditModal(true)
  }

  const handleEditChange = ({target}) => {
   setEditFormData({ ...editFormData, [target.name]: target.value });
  }

  const handleEditSubmit = async (e) => {
  e.preventDefault();

  if(!editFormData.nombre_servicio.trim() || !editFormData.descripcion.trim()) {
    return warn("Campos obligatorios", "Nombre y descripción no pueden quedar vaciós")
  }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/servicios/${selectedServicio.id}`,
        {
          nombre_servicio: editFormData.nombre_servicio,
          descripcion:     editFormData.descripcion,
          fecha_inicio:    editFormData.fecha_inicio || null,
          fecha_fin:       editFormData.fecha_fin    || null,
          precio:          parseFloat(editFormData.precio) || 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      /* Actualizar la lista en pantalla sin recargar */
      setServicios((prev) =>
        prev.map((s) =>
          s.id === selectedServicio.id
            ? { ...s, ...editFormData }
            : s
        )
      );

      setShowEditModal(false);
      await ok("Servicio actualizado", "Los cambios se guardaron correctamente");
    } catch (err) {
      console.error(err)
      errorSwal("Error al actualizar", err.response?.data?.message || "Intenta más tarde")
    }
  };

    const handleAddChange = ({ target }) =>
    setAddFormData({ ...addFormData, [target.name]: target.value });

    const handleAddSubmit = async (e) => {
      e.preventDefault();

      if(!addFormData.nombre_servicio.trim() || !addFormData.descripcion.trim()) {
        return warn("Campos obligatorios", "Nombre y descripción no pueden quedar vaciós")
      }

      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/servicios`,
          {
            ...addFormData,
            precio: parseFloat(addFormData.precio) || 0,
            reparacion_id: reparacionId,         
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Refrescar la lista localmente 
        setServicios((prev) => [...prev, { ...addFormData, id: Date.now() }]);
        setShowAddModal(false);
        setAddFormData({
          nombre_servicio: "",
          descripcion: "",
          fecha_inicio: "",
          fecha_fin: "",
          precio: "",
        });
        await ok("Servicio agregado", "Se regsitró correctamente");
      } catch (err) {
        console.error(err)
        errorSwal("Error al agregar", err.response?.data?.message || "Intenta más tarde")
      }
    };


  if (!userData || !vehiculoData || !reparacionInfo) {
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
          <h1 style={titleStyle}>Reparación #{reparacionInfo.id}</h1>
          <p style={subtitleStyle}>
            {vehiculoData.marca} {vehiculoData.modelo}
          </p>
          <p style={subtitleStyle}>Placa: {vehiculoData.placa}</p>

          <div style={infoRowStyle}>
            <span>Fecha de Inicio: {reparacionInfo.fecha_inicio}</span>
            <span>Fecha de Finalización: {reparacionInfo.fecha_fin}</span>
          </div>
        </div>

        {/* Sección de Fotos Antes y Después */}
        {(reparacionInfo.imagen_antes || reparacionInfo.imagen_despues) && (
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={sectionTitleStyle}>Fotos de la Reparación</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem"
            }}>
              {/* Foto Antes */}
              {reparacionInfo.imagen_antes && (
                <div style={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.75rem",
                    textAlign: "center"
                  }}>
                    Antes de la Reparación
                  </h3>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${reparacionInfo.imagen_antes}`}
                    alt="Antes de la reparación"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "0.375rem",
                      border: "2px solid #e5e7eb"
                    }}
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=";
                    }}
                  />
                </div>
              )}

              {/* Foto Después */}
              {reparacionInfo.imagen_despues && (
                <div style={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.75rem",
                    textAlign: "center"
                  }}>
                    Después de la Reparación
                  </h3>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${reparacionInfo.imagen_despues}`}
                    alt="Después de la reparación"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "0.375rem",
                      border: "2px solid #e5e7eb"
                    }}
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Servicios Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",           
              marginBottom: "1rem"
            }}
          >
            <h2 style={sectionTitleStyle}>Servicios</h2>

            <button
              onClick={() => setShowAddModal(true)}
              style={{
                backgroundColor: "#22c55e",
                color: "white",
                padding: "0.6rem 1.2rem",
                borderRadius: "0.375rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer"
              }}
              onMouseOver={e => (e.target.style.backgroundColor = "#16a34a")}
              onMouseOut={e => (e.target.style.backgroundColor = "#22c55e")}
            >
              Agregar Servicio
            </button>
          </div>
        {/* Lista de Servicios */}
        
        {servicios.length === 0 && (
             <p style={{ color: "#6b7280", fontSize: "1rem" }}>Esta reparación no tiene servicios asociados.</p>

        )}

        {servicios.map((servicio, index) => (
          <div key={index} style={servicioCardStyle}>
            <h3 style={servicioTitleStyle}>{servicio.nombre_servicio}</h3>
            <p style={servicioDescriptionStyle}>Descripción: {servicio.descripcion}</p>
            <p style={servicioDetailStyle}>Fecha de Inicio: {servicio.fecha_inicio}</p>
            <p style={servicioDetailStyle}>Fecha de Finalización: {servicio.fecha_fin}</p>

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
   
              <p style={valorStyle}>Valor: ${servicio.precio}</p>
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
                  name="nombre_servicio"
                  value={editFormData.nombre_servicio}
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
                  type="date"
                  name="fecha_inicio"
                  value={editFormData.fecha_inicio ?? ""}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Fecha de inicio (DD/MM/YYYY)"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="date"
                  name="fecha_fin"
                  value={editFormData.fecha_fin ?? ""}
                  onChange={handleEditChange}
                  style={inputStyle}
                  placeholder="Fecha de finalización (DD/MM/YYYY o ----)"
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={editFormData.precio.toString()}
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

      {/* Modal agregar servicio */}
      {showAddModal && (
        <div style={modalOverlayStyle} onClick={() => setShowAddModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h2 style={modalTitleStyle}>Nuevo Servicio</h2>
              <p style={modalSubtitleStyle}>Complete los datos del servicio</p>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="nombre_servicio"
                  value={addFormData.nombre_servicio}
                  onChange={handleAddChange}
                  style={inputStyle}
                  placeholder="Nombre del servicio"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <textarea
                  name="descripcion"
                  value={addFormData.descripcion}
                  onChange={handleAddChange}
                  style={textareaStyle}
                  placeholder="Descripción del servicio"
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="date"
                  name="fecha_inicio"
                  value={addFormData.fecha_inicio}
                  onChange={handleAddChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="date"
                  name="fecha_fin"
                  value={addFormData.fecha_fin}
                  onChange={handleAddChange}
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={addFormData.precio}
                  onChange={handleAddChange}
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
                  Guardar
                </button>
                <button
                  type="button"
                  style={cancelButtonStyle}
                  onClick={() => setShowAddModal(false)}
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