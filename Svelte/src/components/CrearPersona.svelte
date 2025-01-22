<script>
    import { onMount } from 'svelte';
    import { getPersonas, createPersona} from '../services/personaService.js';

    let personas = [];
    let newPersona = { nombre: '', apellido: '', email: '' }; // Adaptado a la entidad
    
    // Cargar los personas al montar el componente
    onMount(async () => {
    personas = await getPersonas();
    });

    // Agregar un nuevo persona
    async function addPersona() {
    if (!newPersona.nombre || !newPersona.apellido || !newPersona.email) {
        alert('Por favor, completa todos los campos');
        return;
    }
    const persona = await createPersona(newPersona);
    personas = [...personas, persona];
    newPersona = { nombre: '', apellido: '', email: '' };
    }
</script>

<main>
    <h1>Persona</h1>
    <h2>Añadir Persona</h2>
    <input bind:value={newPersona.nombre} placeholder="Nombre" />
    <input bind:value={newPersona.apellido} placeholder="Apellido" />
    <input bind:value={newPersona.email} placeholder="Email" type="email" />
    <button on:click={addPersona}>Agregar</button>

</main>
