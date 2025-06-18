import apiClient from './axios';

// Obtiene todos los pagos (ruta solo para ADMIN)
export const getPagos = (token) => {
    return apiClient.get('/api/pagos', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Elimina un pago por su ID (ruta solo para ADMIN)
export const deletePago = (id, token) => {
    return apiClient.delete(`/api/pagos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
export const realizarPago = (pagoData, token) => {
    return apiClient.post('/api/pagos', pagoData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};