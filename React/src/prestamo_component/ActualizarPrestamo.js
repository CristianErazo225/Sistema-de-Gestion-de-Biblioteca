import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarPrestamo() {
    const { id } = useParams(); // Para obtener el ID del préstamo desde la URL
    const [prestamo, setPrestamo] = useState({
        fecha_inicio: "",
        fecha_fin: "",
        persona: null,
        libro: null,
    });
    const [personas, setPersonas] = useState([]);
    const [libros, setLibros] = useState([]);
    const navigate = useNavigate(); // Para manejar la navegación

    useEffect(() => {
        fetchPrestamo();
        fetchPersonas();
        fetchLibros();
    }, [id]);

    const fetchPrestamo = () => {
        api.get(`/prestamo/${id}`)
            .then((response) => setPrestamo(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const fetchPersonas = () => {
        api.get("/persona/obtener/persona") // O la URL correspondiente para obtener las personas
            .then((response) => setPersonas(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const fetchLibros = () => {
        api.get("/libro/obtener/libro") // O la URL correspondiente para obtener los libros
            .then((response) => setLibros(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica si los valores seleccionados para persona y libro están correctamente definidos
        const updatedPrestamo = {
            ...prestamo,
            persona: prestamo.persona ? prestamo.persona : prestamo.persona?.id,
            libro: prestamo.libro ? prestamo.libro : prestamo.libro?.id,
        };

        api.put(`/prestamo/${id}`, updatedPrestamo)
            .then(() => {
                alert("Préstamo actualizado correctamente.");
                navigate("/prestamos"); // Redirige a la lista de préstamos
            })
            .catch((error) => {
                console.error("Error al actualizar el préstamo: ", error);
                alert("Hubo un error al actualizar el préstamo.");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrestamo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Actualizar Préstamo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="fecha_inicio">Fecha Inicio</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_inicio"
                        name="fecha_inicio"
                        value={prestamo.fecha_inicio}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="fecha_fin">Fecha Fin</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_fin"
                        name="fecha_fin"
                        value={prestamo.fecha_fin}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="persona">Persona</label>
                    <select
                        className="form-control"
                        id="persona"
                        name="persona"
                        value={prestamo.persona ? prestamo.persona.id : ""}
                        onChange={(e) =>
                            setPrestamo({
                                ...prestamo,
                                persona: { id: e.target.value },
                            })
                        }
                        required
                    >
                        <option value="">Selecciona una persona</option>
                        {personas.map((persona) => (
                            <option key={persona.id} value={persona.id}>
                                {persona.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="libro">Libro</label>
                    <select
                        className="form-control"
                        id="libro"
                        name="libro"
                        value={prestamo.libro ? prestamo.libro.id : ""}
                        onChange={(e) =>
                            setPrestamo({
                                ...prestamo,
                                libro: { id: e.target.value },
                            })
                        }
                        required
                    >
                        <option value="">Selecciona un libro</option>
                        {libros.map((libro) => (
                            <option key={libro.id} value={libro.id}>
                                {libro.titulo}
                            </option>
                        ))}
                    </select>
                </div> 

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/prestamos")} // Usamos navigate para redirigir
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ActualizarPrestamo;
