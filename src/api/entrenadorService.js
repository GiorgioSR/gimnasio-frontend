import apiClient from './axios';

// La creación ahora solo llama al endpoint de registro. Simple y directo.
export const createEntrenador = (entrenadorData, token) => {
    const payload = { ...entrenadorData, rol: 'ENTRENADOR' };
    return apiClient.post('/api/auth/register', payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// La actualización ahora enviará un DTO más simple.
export const updateEntrenador = (id, entrenadorData, token) => {
    return apiClient.put(`/api/entrenadores/${id}`, entrenadorData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getEntrenadores = (token) => {
    return apiClient.get('/api/entrenadores', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteEntrenador = (id, token) => {
    return apiClient.delete(`/api/entrenadores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};