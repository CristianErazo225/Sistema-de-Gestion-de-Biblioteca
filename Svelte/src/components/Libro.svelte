<script>
    import { onMount } from 'svelte';
    import { getLibros, updateLibro, deleteLibro } from '../services/libroService.js';
  
    let libros = [];
    let editMode = false;
    let libroEdit = { id_libro: null, titulo: '', autor: '', anio_publicacion: '' }; // Incluye id_libro
  
    // Cargar los libros al montar el componente
    onMount(async () => {
      libros = await getLibros();
    });
  
    // Activar el modo de edición
    async function editLibro(libro) {
      editMode = true;
      libroEdit = { ...libro };
    }
  
    // Guardar los cambios del libro editado
    async function saveEdit() {
      if (!libroEdit.titulo || !libroEdit.autor || !libroEdit.anio_publicacion) {
        alert('Por favor, completa todos los campos');
        return;
      }
      await updateLibro(libroEdit.id_libro, libroEdit);
      libros = libros.map((libro) =>
        libro.id_libro === libroEdit.id_libro ? libroEdit : libro
      );
      editMode = false;
      libroEdit = { id_libro: null, titulo: '', autor: '', anio_publicacion: '' };
    }
  
    // Eliminar un libro
    async function removeLibro(id_libro) {
      await deleteLibro(id_libro);
      libros = libros.filter((libro) => libro.id_libro !== id_libro);
    }

    function cancelEdit() {
        editMode = false; // Salir del modo de edición
        libroEdit = {};   // Restablecer el objeto libroEdit
    }
</script>
  
  <main>
    <h2>Lista de Libros</h2>
    <ul>
      {#each libros as libro}
        <li>
          {libro.titulo} - {libro.autor} ({libro.anio_publicacion})
          <button on:click={() => editLibro(libro)}>Editar</button>
          <button on:click={() => removeLibro(libro.id_libro)}>Eliminar</button>
        </li>
      {/each}
    </ul>

    {#if editMode}
    <h2>Editar Libro</h2>
    <input bind:value={libroEdit.titulo} placeholder="Título" />
    <input bind:value={libroEdit.autor} placeholder="Autor" />
    <input bind:value={libroEdit.anio_publicacion} placeholder="Año" type="number" />
    <button on:click={saveEdit}>Guardar Cambios</button>
    <button on:click={cancelEdit}>Cancelar</button>
    {/if}
  </main>
  