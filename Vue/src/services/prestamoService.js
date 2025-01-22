import axiosInstance from './axiosInstance';

// Obtener todos los préstamos
export const obtenerPrestamos = () => {
  return axiosInstance.get('/prestamo/obtener/prestamo');  // Ruta correcta para obtener los préstamos
};

// Obtener todos los préstamos con relaciones
export const obtenerPrestamosConRelaciones = () => {
    return axiosInstance.get('/prestamo/full/Prestamos');  // Ruta correcta para obtener los préstamos con relaciones
  };  

// Obtener un préstamo por su id
export const obtenerPrestamoPorId = (idPrestamo) => {
  return axiosInstance.get(`/prestamo/${idPrestamo}`);  // Ruta para obtener un préstamo específico
};

// Actualizar un préstamo por su id
export const actualizarPrestamo = (id, data) => {
  return axiosInstance.put(`/prestamo/${id}`, data); // Ruta para actualizar un préstamo por su ID
};

// En tu servicio de préstamos (prestamoService.js)
export const crearPrestamo = (data) => {
    return axiosInstance.post('/crear/prestamo', data)
      .then(response => {
        console.log('Préstamo creado exitosamente:', response.data);
        return response.data;  // Devolvemos la respuesta para su uso
      })
      .catch(error => {
        console.error('Error al crear préstamo:', error);
        throw error; // Lanzamos el error para manejarlo en el componente
      });
  };
  

// Eliminar un préstamo
export const eliminarPrestamo = (id) => {
  return axiosInstance.delete(`/prestamo/${id}`)
    .then(response => response.data) // Devolvemos solo los datos
    .catch(error => {
      console.error(`Error al eliminar el préstamo con id ${id}:`, error);
      throw error;
    });
};
