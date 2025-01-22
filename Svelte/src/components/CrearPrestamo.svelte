<script>
    import { onMount } from 'svelte';
    import { getPrestamos, createPrestamo } from '../services/prestamoService.js';
    import { getPersonas } from '../services/personaService.js';
    import { getLibros } from '../services/libroService.js';

    let prestamos = [];
    let personas = [];
    let libros = [];
    let newPrestamo = { fecha_inicio: '', fecha_fin: '', personaId: null, libroId: null };

    // Cargar los datos necesarios al montar el componente
    onMount(async () => {
        prestamos = await getPrestamos();
        personas = await getPersonas();
        libros = await getLibros();
    });

    // Agregar un nuevo préstamo
    async function addPrestamo() {
        if (!newPrestamo.fecha_inicio || !newPrestamo.fecha_fin || !newPrestamo.personaId || !newPrestamo.libroId) {
            alert('Por favor, completa todos los campos');
            return;
        }

        // Construir el objeto para enviar al backend
        const prestamoData = {
            fecha_inicio: newPrestamo.fecha_inicio,
            fecha_fin: newPrestamo.fecha_fin,
            persona: { id_persona: newPrestamo.personaId }, // Relación con persona
            libro: { id_libro: newPrestamo.libroId },       // Relación con libro
        };

        try {
            const prestamo = await createPrestamo(prestamoData);
            prestamos = [...prestamos, prestamo];
            newPrestamo = { fecha_inicio: '', fecha_fin: '', personaId: null, libroId: null };
        } catch (error) {
            alert('Ocurrió un error al guardar el préstamo. Por favor, verifica los datos.');
            console.error(error);
        }
    }
</script>

<main>
    <h1>Préstamos</h1>
    <h2>Añadir Préstamo</h2>
    <form on:submit|preventDefault={addPrestamo}>
        <label>
            Fecha de Inicio:
            <input bind:value={newPrestamo.fecha_inicio} placeholder="Fecha de Inicio" type="date" required />
            Fecha de Fin:
            <input bind:value={newPrestamo.fecha_fin} placeholder="Fecha de Fin" type="date" required />
            Persona:
            <select bind:value={newPrestamo.personaId} required>
                <option value="" disabled selected>Selecciona una persona</option>
                {#each personas as persona}
                    <option value={persona.id_persona}>{persona.nombre}</option>
                {/each}
            </select>
            Libro:
            <select bind:value={newPrestamo.libroId} required>
                <option value="" disabled selected>Selecciona un libro</option>
                {#each libros as libro}
                    <option value={libro.id_libro}>{libro.titulo}</option>
                {/each}
            </select>
        </label>
        <button type="submit">Agregar</button>
    </form>
</main>
