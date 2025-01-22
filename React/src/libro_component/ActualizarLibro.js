import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarLibro() {
    const { id } = useParams(); // Para obtener el ID de la persona desde la URL
    const [libro, setLibro] = useState({
        nombre: "",
        apellido: "",
        email: "",
    });

    const navigate = useNavigate(); // Para manejar la navegación

    useEffect(() => {
        fetchLibro();
    }, [id]);

    // Función para obtener los datos de la persona
    const fetchLibro = () => {
        api.get(`/libro/${id}`)
            .then((response) => setLibro(response.data))
            .catch((error) => console.error("Error al obtener el libro: ", error));
    };

    // Maneja la actualización de la persona
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/libro/${id}`, libro) // Enviamos el estado de persona en el cuerpo de la solicitud
            .then(() => {
                alert("Libro actualizado correctamente.");
                navigate("/libros"); // Redirige a la lista de personas
            })
            .catch((error) => {
                console.error("Error al actualizar el libro: ", error);
                alert("Hubo un error al actualizar el libro.");
            });
    };

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Actualizar Libro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="titulo">Titulo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        name="titulo"
                        value={libro.titulo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="autor">Autor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="autor"
                        name="autor"
                        value={libro.autor}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="anio_publicacion">Año de publicacion</label>
                    <input
                        type="number"
                        className="form-control"
                        id="anio_publicacion"
                        name="anio_publicacion"
                        value={libro.anio_publicacion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/libros")} // Usamos navigate para redirigir
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ActualizarLibro;
