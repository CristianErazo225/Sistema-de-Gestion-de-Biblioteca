<template>
  <div>
    <h1>Editar Libro</h1>
    <form @submit.prevent="actualizarLibro">
      <label for="titulo">Título:</label>
      <input v-model="titulo" id="titulo" placeholder="Título" required />
      
      <label for="autor">Autor:</label>
      <input v-model="autor" id="autor" placeholder="Autor" required />
      
      <label for="anioPublicacion">Año de Publicación:</label>
      <input v-model="anioPublicacion" id="anioPublicacion" placeholder="Año de Publicación" required />
      
      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
import { obtenerLibro, actualizarLibro } from '../../services/libroService';

export default {
  data() {
    return {
      titulo: '',
      autor: '',
      anioPublicacion: '',
    };
  },
  async created() {
    const libroId = this.$route.params.idLibro; // Obtener el id del libro desde la URL
    console.log('ID del libro:', libroId); // Verificar si el idLibro es correcto
    if (libroId) {
      await this.cargarLibro(libroId);
    }
  },
  methods: {
    // Método para cargar los datos del libro
    async cargarLibro(id) {
      try {
        const response = await obtenerLibro(id); // Obtener los datos del libro desde la API
        console.log('Respuesta de la API:', response); // Verificar la respuesta de la API
        const libro = response.data; // Asignar los datos al objeto libro
        this.titulo = libro.titulo;
        this.autor = libro.autor;
        this.anioPublicacion = libro.anio_publicacion;
      } catch (error) {
        console.error('Error al cargar el libro:', error);
      }
    },
    // Método para actualizar el libro
    async actualizarLibro() {
      const libroActualizado = {
        titulo: this.titulo,
        autor: this.autor,
        anio_publicacion: this.anioPublicacion,
      };
      try {
        await actualizarLibro(this.$route.params.idLibro, libroActualizado); // Usamos el idLibro del parámetro
        this.$router.push('/libros'); // Redirigir a la lista de libros después de la actualización
      } catch (error) {
        console.error('Error al actualizar el libro:', error);
      }
    },
  },
};
</script>
