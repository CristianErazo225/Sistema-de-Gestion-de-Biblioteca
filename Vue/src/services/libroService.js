import axiosInstance from './axiosInstance';

export const obtenerLibros = () => {
  return axiosInstance.get('/libro/obtener/libro');  // Ruta para obtener los libros
};

export const agregarLibro = (data) => {
  return axiosInstance.post('/libro/crear/libro', data);  // Ruta para agregar un nuevo libro
};

// Obtener un libro por su id
export const obtenerLibroPorId = (idLibro) => {
  return axiosInstance.get(`/libro/${idLibro}`);  // Ruta para obtener un libro específico
};

export const actualizarLibro = (id, data) => {
  return axiosInstance.put(`/libro/${id}`, data); // Ruta para actualizar un libro por su ID
};

// Eliminar un libro por su id
export const eliminarLibro = (idLibro) => {
  return axiosInstance.delete(`/libro/${idLibro}`); // Ruta para eliminar un libro por su ID
};
