<template>
  <div>
    <h1>Editar Persona</h1>
    <form @submit.prevent="actualizarPersona">
      <label for="nombre">Nombre:</label>
      <input v-model="nombre" id="nombre" placeholder="Nombre" required />
      
      <label for="apellido">Apellido:</label>
      <input v-model="apellido" id="apellido" placeholder="Apellido" required />
      
      <label for="email">Email:</label>
      <input v-model="email" id="email" placeholder="Email" required />
      
      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
import { obtenerPersona, actualizarPersona } from '../../services/personaService'; // Asegúrate de que estos servicios estén correctamente configurados

export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      email: '',
    };
  },
  async created() {
    const personaId = this.$route.params.idPersona; // Obtener el id de la persona desde la URL
    console.log('ID de la persona:', personaId); // Verificar si el idPersona es correcto
    if (personaId) {
      await this.cargarPersona(personaId);
    }
  },
  methods: {
    // Método para cargar los datos de la persona
    async cargarPersona(id) {
      try {
        const response = await obtenerPersona(id); // Obtener los datos de la persona desde la API
        console.log('Respuesta de la API:', response); // Verificar la respuesta de la API
        const persona = response.data; // Asignar los datos al objeto persona
        this.nombre = persona.nombre;
        this.apellido = persona.apellido;
        this.email = persona.email;
      } catch (error) {
        console.error('Error al cargar la persona:', error);
      }
    },
    // Método para actualizar la persona
    async actualizarPersona() {
      const personaActualizada = {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
      };
      try {
        await actualizarPersona(this.$route.params.idPersona, personaActualizada); // Usamos el idPersona del parámetro
        this.$router.push('/personas'); // Redirigir a la lista de personas después de la actualización
      } catch (error) {
        console.error('Error al actualizar la persona:', error);
      }
    },
  },
};
</script>
