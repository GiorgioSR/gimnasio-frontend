import apiClient from './axios';

export const getMembresias = (token) => {
    return apiClient.get('/api/membresias', {
        headers: { Authorization: `Bearer ${token}` }
    });
};