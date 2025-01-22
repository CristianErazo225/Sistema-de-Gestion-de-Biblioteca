<template>
  <div>
    <h2>Agregar Préstamo</h2>
    <form @submit.prevent="agregarPrestamo">
      <label for="fecha_inicio">Fecha de Inicio:</label>
      <input v-model="fecha_inicio" type="date" required />

      <label for="fecha_fin">Fecha de Fin:</label>
      <input v-model="fecha_fin" type="date" required />

      <label for="persona">Persona:</label>
      <select v-model="persona" required>
        <option v-for="persona in personas" :key="persona.id_persona" :value="persona.id_persona">
          {{ persona.nombre }} {{ persona.apellido }}
        </option>
      </select>

      <label for="libro">Libro:</label>
      <select v-model="libro" required>
        <option v-for="libro in libros" :key="libro.id_libro" :value="libro.id_libro">
          {{ libro.titulo }}
        </option>
      </select>

      <button type="submit">Agregar</button>
      <button type="button" @click="cerrarFormulario">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { crearPrestamo } from '../../services/prestamoService';
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
    try {
      const personasResponse = await obtenerPersonas();
      this.personas = personasResponse.data;

      const librosResponse = await obtenerLibros();
      this.libros = librosResponse.data;
    } catch (error) {
      console.error('Error al cargar personas o libros:', error);
    }
  },
  methods: {
    async agregarPrestamo() {
      const nuevoPrestamo = {
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        persona: this.persona,
        libro: this.libro,
      };
      try {
        await crearPrestamo(nuevoPrestamo);
        this.$emit('prestamoAgregado');
        this.cerrarFormulario();
      } catch (error) {
        console.error('Error al agregar préstamo:', error);
      }
    },
    cerrarFormulario() {
      this.$emit('cerrar');
    }
  },
};
</script>
