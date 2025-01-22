import { createRouter, createWebHistory } from 'vue-router';

// Rutas de libros
import LibroList from '../components/libro/LibroList.vue';
import AgregarLibro from '../components/libro/AgregarLibro.vue';
import EditarLibro from '../components/libro/EditarLibro.vue';

// Rutas de personas
import PersonaList from '../components/persona/PersonaList.vue'; 
import AgregarPersona from '../components/persona/AgregarPersona.vue'; 
import EditarPersona from '../components/persona/EditarPersona.vue'; 

// Rutas de préstamos
import PrestamoList from '../components/prestamo/PrestamoList.vue';
import AgregarPrestamo from '../components/prestamo/AgregarPrestamo.vue';
import EditarPrestamo from '../components/prestamo/EditarPrestamo.vue';

const routes = [
  // Rutas de libros
  { path: '/', component: LibroList },
  { path: '/libros', component: LibroList },
  { path: '/crear-libro', component: AgregarLibro },
  { path: '/editar-libro/:idLibro', component: EditarLibro, name: 'editarLibro' },

  // Rutas de personas
  { path: '/personas', component: PersonaList },
  { path: '/crear-persona', component: AgregarPersona },
  { path: '/editar-persona/:idPersona', component: EditarPersona, name: 'editarPersona' },

  // Rutas de préstamos
  { path: '/prestamos', component: PrestamoList },
  { path: '/crear-prestamo', component: AgregarPrestamo },
  { path: '/editar-prestamo/:idPrestamo', component: EditarPrestamo, name: 'editarPrestamo' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
