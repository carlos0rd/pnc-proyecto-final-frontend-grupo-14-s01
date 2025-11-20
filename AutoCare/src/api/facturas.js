/**
 * API service for invoices (facturas)
 */

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get authentication token from localStorage
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Get all invoices for the authenticated client
 * @returns {Promise<Array>} Array of invoices
 */
export const obtenerFacturas = async () => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${API_URL}/facturas`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Error al obtener facturas');
  }

  return response.json();
};

/**
 * Get invoice details by ID
 * @param {number} id - Invoice ID
 * @returns {Promise<Object>} Invoice details
 */
export const obtenerFacturaPorId = async (id) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${API_URL}/facturas/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Error al obtener factura');
  }

  return response.json();
};

/**
 * Download invoice as PDF
 * @param {number} id - Invoice ID
 * @returns {Promise<Blob>} PDF blob
 */
export const descargarFacturaPDF = async (id) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${API_URL}/facturas/${id}/pdf`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Error al descargar factura');
  }

  const blob = await response.blob();
  return blob;
};

