import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function PersonasList({ onSelectPersona }) {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        fetchPersonas();
    }, []);

    const fetchPersonas = () => {
        api.get("/persona/obtener/persona")
            .then((response) => setPersonas(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el persona Nro: ${id}?`)) {
            api.delete(`/persona/${id}`)
                .then(() => {
                    console.log(`persona Nro: ${id} eliminado correctamente.`);
                    fetchPersonas();
                })
                .catch((error) => console.error("Error: ", error));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de personas</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th># Persona</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((persona) => (
                            <tr key={persona.id_persona}>
                                <td>{persona.id_persona}</td>
                                <td>{persona.nombre}</td>
                                <td>{persona.apellido}</td>
                                <td>{persona.email}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary btn-sm me-2"
                                        to={`/persona/actualizar/${persona.id_persona}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(persona.id_persona)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PersonasList;
