<script>
    import { onMount } from 'svelte';
    import { getPersonas, updatePersona, deletePersona } from '../services/personaService.js';

    let personas = [];
    let editMode = false;
    let personaEdit = { id_persona: null, nombre: '', apellido: '', email: '' }; // Incluye id_persona

    // Cargar los personas al montar el componente
    onMount(async () => {
    personas = await getPersonas();
    });

    // Activar el modo de edición
    async function editPersona(persona) {
    editMode = true;
    personaEdit = { ...persona };
    }

    // Guardar los cambios del persona editado
    async function saveEdit() {
    if (!personaEdit.nombre || !personaEdit.apellido || !personaEdit.email) {
        alert('Por favor, completa todos los campos');
        return;
    }
    await updatePersona(personaEdit.id_persona, personaEdit);
    personas = personas.map((persona) =>
        persona.id_persona === personaEdit.id_persona ? personaEdit : persona
    );
    editMode = false;
    personaEdit = { id_persona: null, nombre: '', apellido: '', email: '' };
    }

    // Eliminar un persona
    async function removePersona(id_persona) {
    await deletePersona(id_persona);
    personas = personas.filter((persona) => persona.id_persona !== id_persona);
    }

    function cancelEdit() {
        editMode = false; // Salir del modo de edición
        personaEdit = {};   // Restablecer el objeto personaEdit
    }
</script>

<main>
    <h2>Lista de Personas</h2>
    <ul>
    {#each personas as persona}
        <li>
        {persona.nombre} - {persona.apellido} ({persona.email})
        <button on:click={() => editPersona(persona)}>Editar</button>
        <button on:click={() => removePersona(persona.id_persona)}>Eliminar</button>
        </li>
    {/each}
    </ul>

    {#if editMode}
    <h2>Editar Persona</h2>
    <input bind:value={personaEdit.nombre} placeholder="nombre" />
    <input bind:value={personaEdit.apellido} placeholder="apellido" />
    <input bind:value={personaEdit.email} placeholder="email" type="email" />
    <button on:click={saveEdit}>Guardar Cambios</button>
    <button on:click={cancelEdit}>Cancelar</button>
    {/if}
</main>
