<template>
  <nav>
    <ul>
      <li><router-link to="/libros">Libros</router-link></li>
      <li><router-link to="/crear-libro">Agregar Libro</router-link></li>
      <li><router-link to="/personas">Lista de Personas</router-link></li>
      <li><router-link to="/prestamos">Lista de Préstamos</router-link></li> <!-- Nuevo enlace para los préstamos -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
};
</script>

<style scoped>
/* Estilos del Navbar */
nav {
  background-color: #333;
  color: white;
  padding: 10px;
}

ul {
  list-style-type: none;
}

li {
  display: inline;
  margin-right: 20px;
}

a {
  color: white;
  text-decoration: none;
}
</style>
