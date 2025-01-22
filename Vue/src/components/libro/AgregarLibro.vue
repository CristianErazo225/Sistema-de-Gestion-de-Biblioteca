
<template>
    <div>
      <h1>Agregar Libro</h1>
      <form @submit.prevent="agregarNuevoLibro">
        <div>
          <label for="titulo">Título</label>
          <input v-model="titulo" id="titulo" placeholder="Título" required />
        </div>
        
        <div>
          <label for="autor">Autor</label>
          <input v-model="autor" id="autor" placeholder="Autor" required />
        </div>
  
        <div>
          <label for="anioPublicacion">Año de Publicación</label>
          <input v-model="anioPublicacion" id="anioPublicacion" placeholder="Año de Publicación" required />
        </div>
        
        <button type="submit">Agregar</button>
      </form>
  
      <!-- Mensaje de éxito -->
      <div v-if="libroAgregado" class="success-message">
        Libro agregado con éxito!
      </div>
    </div>
  </template>
  
  <script>
  import { agregarLibro } from '../../services/libroService';
  
  export default {
    data() {
      return {
        titulo: '',
        autor: '',
        anioPublicacion: '',
        libroAgregado: false,  // Variable para mostrar el mensaje de éxito
      };
    },
    methods: {
      async agregarNuevoLibro() {
        try {
          const nuevoLibro = {
            titulo: this.titulo,
            autor: this.autor,
            anio_publicacion: this.anioPublicacion,
          };
          const response = await agregarLibro(nuevoLibro);
          console.log('Libro agregado:', response.data);
          this.libroAgregado = true;  // Cambiar el estado para mostrar el mensaje de éxito
  
          // Limpiar el formulario después de agregar el libro
          this.titulo = '';
          this.autor = '';
          this.anioPublicacion = '';
          
          // Resetear el mensaje de éxito después de un tiempo (por ejemplo, 3 segundos)
          setTimeout(() => {
            this.libroAgregado = false;
          }, 3000);
        } catch (error) {
          console.error('Error al agregar libro:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .success-message {
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  </style>
  