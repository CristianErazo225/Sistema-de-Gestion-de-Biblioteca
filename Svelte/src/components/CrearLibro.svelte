<script>
    import { onMount } from 'svelte';
    import { getLibros, createLibro} from '../services/libroService.js';
  
    let libros = [];
    let newLibro = { titulo: '', autor: '', anio_publicacion: '' }; // Adaptado a la entidad
  
    // Cargar los libros al montar el componente
    onMount(async () => {
      libros = await getLibros();
    });
  
    // Agregar un nuevo libro
    async function addLibro() {
      if (!newLibro.titulo || !newLibro.autor || !newLibro.anio_publicacion) {
        alert('Por favor, completa todos los campos');
        return;
      }
      const libro = await createLibro(newLibro);
      libros = [...libros, libro];
      newLibro = { titulo: '', autor: '', anio_publicacion: '' };
    }
  
</script>
  
  <main>
    <h1>Libros</h1>
  
    <h2>Añadir Libro</h2>
    <input bind:value={newLibro.titulo} placeholder="Título" />
    <input bind:value={newLibro.autor} placeholder="Autor" />
    <input bind:value={newLibro.anio_publicacion} placeholder="Año" type="number" />
    <button on:click={addLibro}>Agregar</button>
  </main>
  