import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarPersona() {
    const { id } = useParams(); // Para obtener el ID de la persona desde la URL
    const [persona, setPersona] = useState({
        nombre: "",
        apellido: "",
        email: "",
    });

    const navigate = useNavigate(); // Para manejar la navegación

    useEffect(() => {
        fetchPersona();
    }, [id]);

    // Función para obtener los datos de la persona
    const fetchPersona = () => {
        api.get(`/persona/${id}`)
            .then((response) => setPersona(response.data))
            .catch((error) => console.error("Error al obtener la persona: ", error));
    };

    // Maneja la actualización de la persona
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/persona/${id}`, persona) // Enviamos el estado de persona en el cuerpo de la solicitud
            .then(() => {
                alert("Persona actualizada correctamente.");
                navigate("/personas"); // Redirige a la lista de personas
            })
            .catch((error) => {
                console.error("Error al actualizar la persona: ", error);
                alert("Hubo un error al actualizar la persona.");
            });
    };

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersona((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Actualizar Persona</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={persona.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        name="apellido"
                        value={persona.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={persona.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/personas")} // Usamos navigate para redirigir
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ActualizarPersona;
