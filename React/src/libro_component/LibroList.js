import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function LibrosList({ onSelectLibro }) {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        fetchLibros();
    }, []);

    const fetchLibros = () => {
        api.get("/libro/obtener/libro")
            .then((response) => setLibros(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el libro Nro: ${id}?`)) {
            api.delete(`/libro/${id}`)
                .then(() => {
                    console.log(`Libro Nro: ${id} eliminado correctamente.`);
                    fetchLibros();
                })
                .catch((error) => console.error("Error: ", error));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Libros</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th># Libro</th>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>Publicacion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.map((libro) => (
                            <tr key={libro.id_libro}>
                                <td>{libro.id_libro}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.anio_publicacion}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary btn-sm me-2"
                                        to={`/libro/actualizar/${libro.id_libro}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(libro.id_libro)}
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

export default LibrosList;
