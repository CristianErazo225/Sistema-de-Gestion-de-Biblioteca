//src\services\personaService.js
import axiosInstance from './axiosInstance';

// Obtener todas las personas
export const obtenerPersonas = () => {
  return axiosInstance.get('/persona/obtener/persona');  // Ruta correcta para obtener las personas
};

// Obtener una persona por su id
export const obtenerPersonaPorId = (idPersona) => {
  return axiosInstance.get(`/persona/${idPersona}`);  // Ruta para obtener una persona específica
};

// Actualizar una persona por su id
export const actualizarPersona = (id, data) => {
  return axiosInstance.put(`/persona/${id}`, data); // Ruta para actualizar una persona por su ID
};

export const crearPersona = (data) => {
  return axiosInstance.post('/persona/crear/persona', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al crear persona:', error);
      throw error;
    });
};

// Eliminar una persona
export const eliminarPersona = (id) => {
  return axiosInstance.delete(`/persona/${id}`)
    .then(response => response.data) // Devolvemos solo los datos
    .catch(error => {
      console.error(`Error al eliminar la persona con id ${id}:`, error);
      throw error;
    });
};
