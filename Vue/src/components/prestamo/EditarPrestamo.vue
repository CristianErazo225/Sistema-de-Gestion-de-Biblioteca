<template>
    <div>
      <h1>Editar Préstamo</h1>
      <form @submit.prevent="actualizarPrestamo">
        <label for="fecha_inicio">Fecha de Inicio:</label>
        <input type="date" v-model="fecha_inicio" id="fecha_inicio" required />
        
        <label for="fecha_fin">Fecha de Fin:</label>
        <input type="date" v-model="fecha_fin" id="fecha_fin" required />
        
        <label for="persona">Persona:</label>
        <select v-model="persona" id="persona" required>
          <option v-for="persona in personas" :key="persona.id_persona" :value="persona.id_persona">
            {{ persona.nombre }} {{ persona.apellido }}
          </option>
        </select>
        
        <label for="libro">Libro:</label>
        <select v-model="libro" id="libro" required>
          <option v-for="libro in libros" :key="libro.id_libro" :value="libro.id_libro">
            {{ libro.titulo }}
          </option>
        </select>
  
        <button type="submit">Actualizar Préstamo</button>
      </form>
    </div>
  </template>
  
  <script>
  import { obtenerPrestamo, actualizarPrestamo } from '../../services/prestamoService';
  import { obtenerPersonas } from '../../services/personaService';
  import { obtenerLibros } from '../../services/libroService';
  
  export default {
    data() {
      return {
        fecha_inicio: '',
        fecha_fin: '',
        persona: null,
        libro: null,
        personas: [],
        libros: [],
      };
    },
    async created() {
      const prestamoId = this.$route.params.idPrestamo; // Obtener el id del préstamo desde la URL
      if (prestamoId) {
        await this.cargarPrestamo(prestamoId);
      }
      await this.cargarPersonasYLibros();
    },
    methods: {
      // Método para cargar los datos del préstamo
      async cargarPrestamo(id) {
        try {
          const response = await obtenerPrestamo(id); // Obtener los datos del préstamo desde la API
          const prestamo = response.data;
          this.fecha_inicio = prestamo.fecha_inicio;
          this.fecha_fin = prestamo.fecha_fin;
          this.persona = prestamo.persona.id_persona;
          this.libro = prestamo.libro.id_libro;
        } catch (error) {
          console.error('Error al cargar el préstamo:', error);
        }
      },
      // Método para cargar las personas y los libros disponibles
      async cargarPersonasYLibros() {
        try {
          const personasResponse = await obtenerPersonas();
          this.personas = personasResponse.data;
          
          const librosResponse = await obtenerLibros();
          this.libros = librosResponse.data;
        } catch (error) {
          console.error('Error al cargar personas o libros:', error);
        }
      },
      // Método para actualizar el préstamo
      async actualizarPrestamo() {
        const prestamoActualizado = {
          fecha_inicio: this.fecha_inicio,
          fecha_fin: this.fecha_fin,
          persona: this.persona,
          libro: this.libro
        };
        
        try {
          await actualizarPrestamo(this.$route.params.idPrestamo, prestamoActualizado); // Usamos el idPrestamo del parámetro
          this.$router.push('/prestamos'); // Redirigir a la lista de préstamos después de la actualización
        } catch (error) {
          console.error('Error al actualizar el préstamo:', error);
        }
      },
    },
  };
  </script>
  