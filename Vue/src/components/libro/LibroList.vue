<template>
  <div>
    <h1>Lista de Libros</h1>
    <ul>
      <li v-for="libro in libros" :key="libro.id_libro">
        {{ libro.titulo }} - {{ libro.autor }} ({{ libro.anio_publicacion }})
        <button @click="editarLibro(libro.id_libro)">Editar</button>
        <button @click="eliminarLibro(libro.id_libro)">Eliminar</button> <!-- Botón de eliminar -->
      </li>
    </ul>
  </div>
</template>

<script>
import { obtenerLibros, eliminarLibro } from '../../services/libroService'; // Importamos eliminarLibro

export default {
  data() {
    return {
      libros: [], // Lista de libros que se obtiene de la API
    };
  },
  async created() {
    await this.cargarLibros();
  },
  methods: {
    async cargarLibros() {
      try {
        const response = await obtenerLibros();
        this.libros = response.data; // Asignamos los datos a la propiedad libros
      } catch (error) {
        console.error('Error al cargar los libros:', error);
      }
    },
    editarLibro(idLibro) {
      // Usamos el nombre de la ruta y pasamos el parámetro :idLibro
      this.$router.push({ name: 'editarLibro', params: { idLibro } });
    },
    async eliminarLibro(idLibro) {
      try {
        // Llamamos al servicio para eliminar el libro
        await eliminarLibro(idLibro);
        
        // Después de eliminar, actualizamos la lista de libros
        this.libros = this.libros.filter(libro => libro.id_libro !== idLibro);
      } catch (error) {
        console.error('Error al eliminar el libro:', error);
      }
    }
  },
};
</script>
