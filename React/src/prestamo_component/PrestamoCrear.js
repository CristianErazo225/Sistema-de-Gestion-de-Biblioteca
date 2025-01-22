import React, {useEffect, useState} from "react";
import api from "../axiosConfig";

function CrearPrestamo() {
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_fin, setFecha_fin] = useState('');
    
    const [id_persona, setId_persona] = useState('');
    const [id_libro, setId_libro] = useState('');

    const [personas, setPersonas] = useState([]);
    const [libros, setLibros] = useState([]);

    // Obtener la lista de personas
    useEffect(() => {
        api.get('/persona/obtener/persona')
            .then(response => setPersonas(response.data))
            .catch(error => console.error("Error al obtener personas: ", error));
    }, []);

    // Obtener la lista de libros
    useEffect(() => {
        api.get('/libro/obtener/libro')
            .then(response => setLibros(response.data))
            .catch(error => console.error("Error al obtener libros: ", error));
    }, []);

    const handleSubmit = () => {
        const newPrestamo = { fecha_inicio, fecha_fin, persona: id_persona, libro: id_libro };
        console.log(newPrestamo);
        api.post('/prestamo/crear/prestamo', newPrestamo)
            .then(response => {
                console.log('Préstamo creado: ', response.data);
                setFecha_inicio('');
                setFecha_fin('');
                setId_persona('');
                setId_libro('');
            })
            .catch(error => console.error("Error al crear el préstamo: ", error));
    };

    return (
        <div>
            <h3>Fecha de inicio del préstamo</h3>
            <input className="form-control" type="date" placeholder="Fecha_inicio" value={fecha_inicio} onChange={(e) => setFecha_inicio(e.target.value)} />
            <br />
            <h3>Fecha de fin del préstamo</h3>
            <input className="form-control" type="date" placeholder="Fecha_fin" value={fecha_fin} onChange={(e) => setFecha_fin(e.target.value)} />
            <br />

            <div>
                <label>
                    Persona:
                    <select value={id_persona} onChange={(e) => setId_persona(e.target.value)}>
                        <option value="">Seleccione a la persona</option>
                        {
                            personas.map(persona => (
                                <option key={persona.id_persona} value={persona.id_persona}>
                                    {persona.id_persona} - {persona.nombre} - {persona.telefono}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </div>
            <br />

            <div>
                <label>
                    Libro:
                    <select value={id_libro} onChange={(e) => setId_libro(e.target.value)}>
                        <option value="">Seleccione un libro</option>
                        {
                            libros.map(libro => (
                                <option key={libro.id_libro} value={libro.id_libro}>
                                    {libro.id_libro} - {libro.titulo} - {libro.autor}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </div>
            <br />

            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>Guardar</button>
        </div>
    );
}

export default CrearPrestamo;
