// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // URL base de tu API
  timeout: 10000,  // Tiempo de espera de la solicitud
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
