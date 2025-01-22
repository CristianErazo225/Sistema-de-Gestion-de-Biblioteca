// app/services/libro.js
import Service from '@ember/service';
import axios from 'axios';

export default class LibroService extends Service {
  axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Asegúrate de que esta URL sea correcta
    timeout: 5000,  // Tiempo de espera en milisegundos
  });

  // Método para obtener todos los libros
  async obtenerLibros() {
    try {
      const response = await this.axiosInstance.get('/libro/obtener/libro');
      return response.data; // Retorna los libros obtenidos desde el servidor
    } catch (error) {
      console.error('Error al obtener los libros:', error.response ? error.response.data : error.message);
      throw new Error('No se pudieron obtener los libros'); // Lanza un error más descriptivo
    }
  }

  // Método para agregar un nuevo libro
  async agregarLibro(data) {
    try {
      const response = await this.axiosInstance.post('/libro/crear/libro', data);
      return response.data; // Retorna el libro creado desde el servidor
    } catch (error) {
      console.error('Error al agregar libro:', error.response ? error.response.data : error.message);
      throw new Error('Hubo un error al agregar el libro'); // Error con mensaje claro
    }
  }

  // Método para actualizar un libro
  async actualizarLibro(id, data) {
    try {
      const response = await this.axiosInstance.put(`/libro/${id}`, data); // Corrige la URL y usa axiosInstance
      return response.data; // Retorna el libro actualizado desde el servidor
    } catch (error) {
      console.error('Error al actualizar el libro:', error.response ? error.response.data : error.message);
      throw new Error('Hubo un error al actualizar el libro'); // Mensaje específico
    }
  }

  // Método para obtener un libro por su ID
  async obtenerLibro(id) {
    try {
      const response = await this.axiosInstance.get(`/libro/${id}`);
      return response.data; // Devuelve los datos del libro
    } catch (error) {
      console.error('Error al obtener el libro:', error.response ? error.response.data : error.message);
      throw new Error('No se pudo obtener el libro'); // Mensaje claro para manejar en el controlador
    }
  }

  // Eliminar un libro
  async eliminarLibro(id_libro) {
    try {
      const response = await this.axiosInstance.delete(`/libro/${id_libro}`);
      return response.data; // Retorna el resultado de la eliminación
    } catch (error) {
      console.error(`Error al eliminar el libro con id ${id_libro}:`, error.response ? error.response.data : error.message);
      throw new Error(`Hubo un error al eliminar el libro con id ${id_libro}`); // Mensaje claro
    }
  }
}
