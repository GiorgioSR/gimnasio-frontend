import axios from 'axios';

// La URL base de tu backend Spring Boot.
// Asegúrate de que tu backend esté corriendo en el puerto 8080.
const BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;