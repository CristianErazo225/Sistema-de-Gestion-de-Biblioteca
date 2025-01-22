<script>
	export let name;
	import Libro from "./components/Libro.svelte";
	import CrearLibro from "./components/CrearLibro.svelte";
	import Persona from "./components/Persona.svelte";
	import CrearPersona from "./components/CrearPersona.svelte";
	import Prestamo from "./components/Prestamo.svelte";
	import CrearPrestamo from "./components/CrearPrestamo.svelte";
  
	// Estado para manejar el componente actual
	let currentComponent = 'Libro';
  
	// Función para cambiar el componente (aunque ahora solo se usa para 'Libro')
	function changeComponent(componentName) {
	  currentComponent = componentName;
	}
  </script>
  
  <main>
	<!-- Navbar -->
	<nav>
		<div class="navbar">
			<h1 class="navbar-title">Biblioteca</h1>
			<ul>
			  <li><a href="#" on:click={() => changeComponent('Libro')}>Libro</a></li>
			  <li><a href="#" on:click={() => changeComponent('CrearLibro')}>Crear Libro</a></li>

			  <li><a href="#" on:click={() => changeComponent('Persona')}>Persona</a></li>
			  <li><a href="#" on:click={() => changeComponent('CrearPersona')}>Crear Persona</a></li>

			  <li><a href="#" on:click={() => changeComponent('Prestamo')}>Prestamo</a></li>
			  <li><a href="#" on:click={() => changeComponent('CrearPrestamo')}>Crear Prestamo</a></li>

			</ul>
		  </div>
	</nav>
  
	<!-- Contenido Dinámico -->
	{#if currentComponent === 'Libro'}
	  <Libro />
	{/if}
	{#if currentComponent === 'CrearLibro'}
	  <CrearLibro />
	{/if}

	{#if currentComponent === 'Persona'}
	  <Persona />
	{/if}
	{#if currentComponent === 'CrearPersona'}
	  <CrearPersona />
	{/if}

	{#if currentComponent === 'Prestamo'}
	  <Prestamo />
	{/if}
	{#if currentComponent === 'CrearPrestamo'}
	  <CrearPrestamo />
	{/if}
  </main>
  
  <style>
	main {
	  text-align: center;
	  padding: 1em;
	  max-width: 240px;
	  margin: 0 auto;
	}
  
	/* h1 {
	  color: #ff3e00;
	  text-transform: uppercase;
	  font-size: 4em;
	  font-weight: 100;
	} */
  
	nav {
	  margin-bottom: 1em;
	  background-color: #f8f9fa;
	  padding: 0.5em 0;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
  
	nav ul {
	  list-style: none;
	  padding: 0;
	  display: flex;
	  justify-content: center;
	  gap: 1em;
	  margin: 0;
	}
  
	nav li {
	  display: inline;
	}
  
	nav a {
	  text-decoration: none;
	  font-size: 1.2em;
	  color: #007bff;
	  font-weight: bold;
	  transition: color 0.3s, transform 0.2s;
	}
  
	nav a:hover {
	  color: #0056b3;
	  transform: scale(1.1);
	}
  
	@media (min-width: 640px) {
	  main {
		max-width: none;
	  }
	}
  </style>
  