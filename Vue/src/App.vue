<!-- src/App.vue -->
<template>
  <div id="app">
    <AppNavbar />
    <router-view></router-view> <!-- Aquí se renderizarán las vistas de las rutas -->
  </div>
</template>

<script>
import AppNavbar from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    AppNavbar
  }
};
</script>

<style>
/* Aquí puedes agregar estilos globales */
</style>
