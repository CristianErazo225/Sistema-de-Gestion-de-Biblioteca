import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function PrestamosList({ onSelectPrestamo }) {
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        fetchPrestamos();
    }, []);

    const fetchPrestamos = () => {
        api.get("/prestamo/full/prestamos")
            .then((response) => setPrestamos(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el préstamo Nro: ${id}?`)) {
            api.delete(`/prestamo/${id}`)
                .then(() => {
                    console.log(`Préstamo Nro: ${id} eliminado correctamente.`);
                    fetchPrestamos();
                })
                .catch((error) => console.error("Error: ", error));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Préstamos</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th># Préstamo</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Persona</th>
                            <th>Libro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prestamos.map((prestamo) => (
                            <tr key={prestamo.id_prestamo}>
                                <td>{prestamo.id_prestamo}</td>
                                <td>{new Date(prestamo.fecha_inicio).toLocaleDateString()}</td>
                                <td>{new Date(prestamo.fecha_fin).toLocaleDateString()}</td>
                                <td>{prestamo.persona ? prestamo.persona.nombre : "Sin asignar"}</td>
                                <td>{prestamo.libro ? prestamo.libro.titulo : "Sin asignar"}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary btn-sm me-2"
                                        to={`/prestamo/actualizar/${prestamo.id_prestamo}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(prestamo.id_prestamo)}
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

export default PrestamosList;
