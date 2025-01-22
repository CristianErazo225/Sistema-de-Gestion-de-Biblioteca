//src\components\persona\AgregarPersona.vue
<template>
  <div>
    <h2>Crear Persona</h2>
    <form @submit.prevent="agregarPersona">
      <label for="nombre">Nombre:</label>
      <input v-model="nombre" type="text" required />

      <label for="apellido">Apellido:</label>
      <input v-model="apellido" type="text" required />

      <label for="email">Email:</label>
      <input v-model="email" type="email" required />

      <button type="submit">Crear</button>
      <button type="button" @click="cerrarFormulario">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { crearPersona } from '../../services/personaService';

export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      email: '',
    };
  },
  methods: {
    async agregarPersona() {
      const nuevaPersona = {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
      };
      try {
        await crearPersona(nuevaPersona);
        this.$emit('personaCreada');
        this.cerrarFormulario();
      } catch (error) {
        console.error('Error al crear persona:', error);
      }
    },
    cerrarFormulario() {
      this.$emit('cerrar');
    }
  },
};
</script>
