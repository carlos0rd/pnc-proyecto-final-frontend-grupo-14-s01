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
  const [processingId, setProcessingId] = useState(null); // cuál se está procesando

  // 👉 estado para el popup bonito
  const [popup, setPopup] = useState({
    visible: false,
    message: "",
    type: "success", // success | error | info
  });

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
      .catch(() => navigate("/vehiculos-cliente"));

    /* 2. Traer reparaciones del vehículo --------------------------- */
    fetch(`${import.meta.env.VITE_API_URL}/reparaciones/vehiculo/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setReparaciones(data))
      .catch((err) => console.error(err));
  }, [id, navigate]);

  // ---------- estilos generales ----------
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const sidebarStyle = {
    width: "280px",
    backgroundColor: "#2D3573",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "0",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  };

  const logoCircleStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const logoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  const menuSectionStyle = {
    flex: 1,
    padding: "1rem 0",
  };

  const menuTitleStyle = {
    padding: "1rem 1.5rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "0.5rem",
  };

  const menuItemStyle = {
    display: "block",
    padding: "1rem 1.5rem",
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    borderLeft: "4px solid transparent",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const activeMenuItemStyle = {
    ...menuItemStyle,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderLeftColor: "white",
    fontWeight: "600",
  };

  const logoutStyle = {
    padding: "1.5rem",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  };

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
  };

  const mainContentStyle = {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#f8f9fa",
  };

  const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    color: "#2D3573",
    textDecoration: "none",
    fontSize: "1rem",
    marginBottom: "1rem",
    cursor: "pointer",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 0.5rem 0",
  };

  const subtitleStyle = {
    fontSize: "1.25rem",
    color: "#6b7280",
    margin: "0 0 0.5rem 0",
  };

  const sectionTitleStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#374151",
    margin: "2rem 0 1.5rem 0",
  };

  const reparacionCardStyle = {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const reparacionTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#2D3573",
    margin: "0 0 0.5rem 0",
  };

  const reparacionDetailStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    margin: "0.25rem 0",
  };

  const getStatusStyle = (status) => {
    let color = "#2D3573";

    if (status.toLowerCase().includes("rechazado")) {
      color = "#DC2626";
    } else if (status.toLowerCase().includes("pendiente")) {
      color = "#F59E0B";
    } else if (status.toLowerCase().includes("curso")) {
      color = "#3B82F6";
    }

    return {
      fontSize: "0.875rem",
      fontWeight: "500",
      color,
      marginBottom: "0.5rem",
    };
  };

  const valorStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#374151",
  };

  // estilos para botones de aprobar / rechazar cotización
  const decisionButtonsContainerStyle = {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.75rem",
    flexWrap: "wrap",
  };

  const approveButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 600,
    backgroundColor: "#10B981",
    color: "white",
  };

  const rejectButtonStyle = {
    ...approveButtonStyle,
    backgroundColor: "#DC2626",
  };

  // ---------- estilos del POPUP ----------
  const popupContainerStyle = {
    position: "fixed",
    top: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
  };

  const getPopupBoxStyle = (type) => {
    let borderColor = "#3B82F6"; // info
    if (type === "success") borderColor = "#10B981";
    if (type === "error") borderColor = "#DC2626";

    return {
      minWidth: "320px",
      maxWidth: "480px",
      backgroundColor: "#111827",
      color: "white",
      borderRadius: "0.75rem",
      borderLeft: `6px solid ${borderColor}`,
      boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
      padding: "1rem 1.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.75rem",
      fontSize: "0.95rem",
    };
  };

  const popupMessageStyle = {
    flex: 1,
  };

  const popupButtonStyle = {
    border: "none",
    borderRadius: "999px",
    padding: "0.35rem 0.9rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    backgroundColor: "white",
    color: "#111827",
  };

  const handleShowPopup = (message, type = "success") => {
    setPopup({ visible: true, message, type });

    // auto-cerrar en 3 segundos
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isAuthenticated")
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

  // 💡 HU3: función para aprobar / rechazar la cotización
  const handleDecisionCotizacion = async (reparacionId, decision) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      setProcessingId(reparacionId);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reparaciones/${reparacionId}/decision-cotizacion`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ decision }), // "aprobada" o "rechazada"
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo registrar la decisión de la cotización.");
      }

      const updated = await response.json();

      setReparaciones((prev) =>
        prev.map((rep) => (rep.id === reparacionId ? { ...rep, ...updated } : rep))
      );

      handleShowPopup(
        decision === "aprobada"
          ? "Has aprobado la cotización. Se podrá iniciar el trabajo."
          : "Has rechazado la cotización.",
        "success"
      );
    } catch (error) {
      console.error(error);
      handleShowPopup(
        "Ocurrió un error al registrar tu decisión sobre la cotización.",
        "error"
      );
    } finally {
      setProcessingId(null);
    }
  }

  if (!userData || !vehiculoData) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div>Cargando...</div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {/* POPUP bonito */}
      {popup.visible && (
        <div style={popupContainerStyle}>
          <div style={getPopupBoxStyle(popup.type)}>
            <div style={popupMessageStyle}>{popup.message}</div>
            <button
              style={popupButtonStyle}
              onClick={() => setPopup((prev) => ({ ...prev, visible: false }))}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
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

      {/* Main */}
      <div style={mainContentStyle}>
        <div style={backButtonStyle} onClick={() => navigate("/vehiculos-cliente")}>
          &lt; Menú Vehículos
        </div>

        <h1 style={titleStyle}>
          {vehiculoData?.marca} {vehiculoData?.modelo}
        </h1>
        <p style={subtitleStyle}>Placa: {vehiculoData?.placa}</p>

        <h2 style={sectionTitleStyle}>Registro de Reparaciones</h2>

        {reparaciones.length === 0 ? (
          <p>No hay reparaciones registradas para este vehículo.</p>
        ) : (
          reparaciones.map((rep) => (
            <div
              key={rep.id}
              style={reparacionCardStyle}
              onClick={() => handleReparacionClick(rep.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={reparacionTitleStyle}>Reparación #{rep.id}</h3>
                  <p style={reparacionDetailStyle}>
                    Inicio: {new Date(rep.fecha_inicio).toLocaleDateString()}
                  </p>
                  <p style={reparacionDetailStyle}>
                    Fin:&nbsp;
                    {rep.fecha_fin ? new Date(rep.fecha_fin).toLocaleDateString() : "----"}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={getStatusStyle(rep.status)}>Status: {rep.status}</p>
                  <p style={valorStyle}>
                    Valor: {rep.precio === null || rep.precio === undefined || rep.precio === 0
                      ? "N/A"
                      : `$${Number(rep.precio).toFixed(2)}`}
                  </p>
                </div>
              </div>

              {/* Botones HU3 */}
              {(() => {
                const status = (rep.status || "").toLowerCase();
                const isCotizacion =
                  status.includes("cotiz") || status.includes("pendiente");

                if (!isCotizacion) return null;

                return (
                  <div style={decisionButtonsContainerStyle}>
                    <button
                      style={approveButtonStyle}
                      disabled={processingId === rep.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecisionCotizacion(rep.id, "aprobada");
                      }}
                    >
                      {processingId === rep.id ? "Guardando..." : "Aprobar cotización"}
                    </button>

                    <button
                      style={rejectButtonStyle}
                      disabled={processingId === rep.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecisionCotizacion(rep.id, "rechazada");
                      }}
                    >
                      {processingId === rep.id ? "Guardando..." : "Rechazar cotización"}
                    </button>
                  </div>
                );
              })()}

              {(rep.imagen_antes || rep.imagen_despues) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {rep.imagen_antes && (
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        overflow: "hidden",
                        border: "2px solid #e5e7eb",
                        backgroundColor: "#f9fafb",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#6b7280",
                          padding: "0.5rem",
                          backgroundColor: "#f3f4f6",
                          textAlign: "center",
                        }}
                      >
                        Antes
                      </div>
                      <img
                        src={`${import.meta.env.VITE_API_URL}${rep.imagen_antes}`}
                        alt="Antes de la reparación"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=";
                        }}
                      />
                    </div>
                  )}

                  {rep.imagen_despues && (
                    <div
                      style={{
                        borderRadius: "0.375rem",
                        overflow: "hidden",
                        border: "2px solid #e5e7eb",
                        backgroundColor: "#f9fafb",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#6b7280",
                          padding: "0.5rem",
                          backgroundColor: "#f3f4f6",
                          textAlign: "center",
                        }}
                      >
                        Después
                      </div>
                      <img
                        src={`${import.meta.env.VITE_API_URL}${rep.imagen_despues}`}
                        alt="Después de la reparación"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ReparacionesCliente
