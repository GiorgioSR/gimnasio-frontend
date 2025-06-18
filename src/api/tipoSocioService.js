import apiClient from './axios';

export const getTiposSocio = (token) => {
  return apiClient.get('/api/tipos-socio', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTipoSocio = (data, token) => {
  return apiClient.post('/api/tipos-socio', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTipoSocio = (id, data, token) => {
  return apiClient.put(`/api/tipos-socio/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTipoSocio = (id, token) => {
  return apiClient.delete(`/api/tipos-socio/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
