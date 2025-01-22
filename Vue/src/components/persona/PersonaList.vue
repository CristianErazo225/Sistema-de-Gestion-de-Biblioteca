<template>
  <div>
    <h1>Gestión de Personas</h1>
    <button @click="mostrarFormulario = true">Agregar Persona</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="persona in personas" :key="persona.id_persona">
          <td>{{ persona.id_persona }}</td>
          <td>{{ persona.nombre }}</td>
          <td>{{ persona.apellido }}</td>
          <td>{{ persona.email }}</td>
          <td>
            <button @click="editarPersona(persona)">Editar</button>
            <button @click="eliminarPersona(persona.id_persona)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para agregar persona -->
    <AgregarPersona
      v-if="mostrarFormulario"
      @cerrar="cerrarFormulario"
      @personaAgregada="cargarPersonas"
    />

    <!-- Mensaje si no hay personas en la lista -->
    <p v-if="personas.length === 0">No hay personas registradas.</p>
  </div>
</template>

<script>
import { obtenerPersonas, eliminarPersona } from '../../services/personaService';
import AgregarPersona from './AgregarPersona.vue';

export default {
  components: { AgregarPersona },
  data() {
    return {
      personas: [],
      mostrarFormulario: false,
    };
  },
  async created() {
    this.cargarPersonas();
  },
  methods: {
    async cargarPersonas() {
      try {
        const response = await obtenerPersonas();
        console.log('Personas obtenidas:', response); // Verificar la respuesta
        this.personas = response.data || response; // Asegurarse de manejar correctamente la respuesta
      } catch (error) {
        console.error('Error al cargar personas:', error);
      }
    },
    async eliminarPersona(id) {
      if (confirm('¿Estás seguro de eliminar esta persona?')) {
        try {
          await eliminarPersona(id);
          this.cargarPersonas(); // Recarga la lista de personas después de eliminar
        } catch (error) {
          console.error('Error al eliminar persona:', error);
        }
      }
    },
    editarPersona(persona) {
      this.$router.push({ name: 'editarPersona', params: { idPersona: persona.id_persona } });
    },
    cerrarFormulario() {
      this.mostrarFormulario = false; // Cierra el formulario cuando se hace clic en "Cancelar"
    }
  },
};
</script>

<style scoped>
/* Estilos básicos para la tabla y botones */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

button {
  padding: 8px 16px;
  margin: 5px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
}

button:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
}

button[type="button"]:hover {
  background-color: #e53935;
}
</style>
