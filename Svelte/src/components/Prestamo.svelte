<script>
    import { onMount } from 'svelte';
    import { getPrestamos, updatePrestamo, deletePrestamo } from '../services/prestamoService.js';
  
    let prestamos = [];
    let editMode = false;
    let prestamoEdit = { 
        id_prestamo: null, 
        fecha_inicio: '', 
        fecha_fin: '', 
        persona: { nombre: '' }, 
        libro: { titulo: '' } 
    };
  
    // Cargar los préstamos al montar el componente
    onMount(async () => {
      prestamos = await getPrestamos();
    });
  
    // Activar el modo de edición
    async function editPrestamo(prestamo) {
      editMode = true;
      prestamoEdit = { 
        ...prestamo, 
        persona: prestamo.persona || { nombre: '' }, 
        libro: prestamo.libro || { titulo: '' } 
      };
    }
  
    // Guardar los cambios del préstamo editado
    async function saveEdit() {
      if (!prestamoEdit.fecha_inicio || !prestamoEdit.fecha_fin || !prestamoEdit.persona.nombre || !prestamoEdit.libro.titulo) {
        alert('Por favor, completa todos los campos');
        return;
      }
      await updatePrestamo(prestamoEdit.id_prestamo, prestamoEdit);
      prestamos = prestamos.map((prestamo) =>
        prestamo.id_prestamo === prestamoEdit.id_prestamo ? prestamoEdit : prestamo
      );
      editMode = false;
      prestamoEdit = { id_prestamo: null, fecha_inicio: '', fecha_fin: '', persona: { nombre: '' }, libro: { titulo: '' } };
    }
  
    // Eliminar un préstamo
    async function removePrestamo(id_prestamo) {
      await deletePrestamo(id_prestamo);
      prestamos = prestamos.filter((prestamo) => prestamo.id_prestamo !== id_prestamo);
    }

    function cancelEdit() {
        editMode = false;
        prestamoEdit = { id_prestamo: null, fecha_inicio: '', fecha_fin: '', persona: { nombre: '' }, libro: { titulo: '' } };
    }
</script>
  
<main>
    <h2>Lista de Préstamos</h2>
    <ul>
      {#each prestamos as prestamo}
        <li>
          {prestamo.fecha_inicio} - {prestamo.fecha_fin} | Persona: {prestamo.persona?.nombre} | Libro: {prestamo.libro?.titulo}
          <button on:click={() => editPrestamo(prestamo)}>Editar</button>
          <button on:click={() => removePrestamo(prestamo.id_prestamo)}>Eliminar</button>
        </li>
      {/each}
    </ul>

    {#if editMode}
    <h2>Editar Préstamo</h2>
    <input bind:value={prestamoEdit.fecha_inicio} placeholder="Fecha de Inicio" type="date" />
    <input bind:value={prestamoEdit.fecha_fin} placeholder="Fecha de Fin" type="date" />
    <input bind:value={prestamoEdit.persona.nombre} placeholder="Persona" />
    <input bind:value={prestamoEdit.libro.titulo} placeholder="Libro" />
    <button on:click={saveEdit}>Guardar Cambios</button>
    <button on:click={cancelEdit}>Cancelar</button>
    {/if}
</main>
