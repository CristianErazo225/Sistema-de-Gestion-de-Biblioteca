<template>
    <div>
      <h1>Gestión de Préstamos</h1>
      <button @click="mostrarFormulario = true">Agregar Préstamo</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Persona</th>
            <th>Libro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prestamo in prestamos" :key="prestamo.id_prestamo">
            <td>{{ prestamo.id_prestamo }}</td>
            <td>{{ prestamo.fecha_inicio }}</td>
            <td>{{ prestamo.fecha_fin }}</td>
            <td>{{ prestamo.persona?.nombre }} {{ prestamo.persona?.apellido }}</td>
            <td>{{ prestamo.libro?.titulo }}</td>
            <td>
              <button @click="editarPrestamo(prestamo)">Editar</button>
              <button @click="eliminarPrestamo(prestamo.id_prestamo)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Formulario para agregar préstamo -->
      <AgregarPrestamo
        v-if="mostrarFormulario"
        @cerrar="cerrarFormulario"
        @prestamoAgregado="cargarPrestamos"
      />
  
      <!-- Mensaje si no hay préstamos en la lista -->
      <p v-if="prestamos.length === 0">No hay préstamos registrados.</p>
    </div>
  </template>
  
  <script>
  import { obtenerPrestamos, eliminarPrestamo } from '../../services/prestamoService';
  import AgregarPrestamo from './AgregarPrestamo.vue';
  
  export default {
    components: { AgregarPrestamo },
    data() {
      return {
        prestamos: [],
        mostrarFormulario: false,
      };
    },
    async created() {
      this.cargarPrestamos();
    },
    methods: {
      async cargarPrestamos() {
        try {
          const response = await obtenerPrestamos();
          console.log('Préstamos obtenidos:', response); // Verificar la respuesta
          this.prestamos = response.data || response; // Asegurarse de manejar correctamente la respuesta
        } catch (error) {
          console.error('Error al cargar préstamos:', error);
        }
      },
      async eliminarPrestamo(id) {
        if (confirm('¿Estás seguro de eliminar este préstamo?')) {
          try {
            await eliminarPrestamo(id);
            this.cargarPrestamos(); // Recarga la lista de préstamos después de eliminar
          } catch (error) {
            console.error('Error al eliminar préstamo:', error);
          }
        }
      },
      editarPrestamo(prestamo) {
        this.$router.push({ name: 'editarPrestamo', params: { idPrestamo: prestamo.id_prestamo } });
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
  