import apiClient from './axios';

// Tu backend usa la herencia, por lo que para crear un socio, primero se crea un usuario
// y luego se crea el perfil de socio. El AuthServiceImpl ya maneja esto en el registro.
// Para un admin creando un socio, asumiremos un flujo similar o un endpoint específico.
// Por ahora, el endpoint de registro es el que crea el usuario y el socio a la vez.

// El endpoint del backend para "crear un socio" como admin no está explícitamente definido,
// el AuthServiceImpl lo hace durante el registro. Para simplificar, aquí usaremos
// el endpoint de registro, pero con el rol 'SOCIO'.
export const createSocio = (socioData, token) => {
    const payload = { ...socioData, rol: 'SOCIO' };
    return apiClient.post('/api/auth/register', payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getSocios = (token) => {
    return apiClient.get('/api/socios', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateSocio = (id, socioData, token) => {
    return apiClient.put(`/api/socios/${id}`, socioData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteSocio = (id, token) => {
    return apiClient.delete(`/api/socios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};