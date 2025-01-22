import Service from '@ember/service';
import axios from 'axios';

export default class Persona extends Service {
  // Crear una instancia de axios con la configuración común
  axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',  // Asegúrate de que la URL de tu API esté correcta
    timeout: 5000,
  });

  // Obtener todas las personas
  async obtenerPersonas() {
    try {
      const response = await this.axiosInstance.get('/persona/obtener/persona');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las personas:', error.message || error);
      throw new Error('No se pudo obtener las personas');
    }
  }

  // Crear una nueva persona
  async crearPersona(personaData) {
    try {
      const response = await this.axiosInstance.post('/persona/crear/persona', personaData);
      return response.data;
    } catch (error) {
      console.error('Error al crear persona:', error.message || error);
      throw new Error('No se pudo crear la persona');
    }
  }

  // Eliminar una persona
  async eliminarPersona(id_persona) {
    try {
      const response = await this.axiosInstance.delete(`/persona/${id_persona}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la persona con id ${id_persona}:`, error);
      throw error;
    }
  }

  async actualizarPersona(idPersona, personaData) {
    try {
      const response = await this.axiosInstance.put(`/persona/${idPersona}`, personaData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la persona:', error);
      throw error;
    }
  }

  async obtenerPersonaPorId(idPersona) {
    try {
      const response = await this.axiosInstance.get(`/persona/${idPersona}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la persona por ID:', error);
      throw new Error('No se pudo obtener la persona');
    }
  }
}
