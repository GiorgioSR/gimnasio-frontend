import apiClient from './axios';

export const generarRutinaIA = (socioId, objetivo, token) => {
    const payload = {
        objetivoAdicional: objetivo
    };
    return apiClient.post(`/api/rutinas/ia/generar/socio/${socioId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Obtiene todas las rutinas asignadas a un socio específico
export const getMisRutinas = (socioId, token) => {
    return apiClient.get(`/api/rutinas/socio/${socioId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};