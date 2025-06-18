import apiClient from './axios';

// Obtiene todas las clases impartidas por un entrenador específico
export const getClasesPorEntrenador = (entrenadorId, token) => {
    return apiClient.get(`/api/clases/entrenador/${entrenadorId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Obtiene la lista de socios inscritos en una clase específica
export const getSociosInscritos = (claseId, token) => {
    return apiClient.get(`/api/clases/${claseId}/inscripciones/socios`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
// Obtiene TODAS las clases (para el admin)
export const getClases = (token) => {
    return apiClient.get('/api/clases', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Crea una nueva clase
export const createClase = (claseData, token) => {
    return apiClient.post('/api/clases', claseData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Actualiza una clase existente
export const updateClase = (id, claseData, token) => {
    return apiClient.put(`/api/clases/${id}`, claseData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Elimina una clase
export const deleteClase = (id, token) => {
    return apiClient.delete(`/api/clases/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};