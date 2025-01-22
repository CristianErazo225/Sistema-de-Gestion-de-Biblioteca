import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

function PrestamoDetalle({ prestamoId }) {
    const [prestamo, setPrestamo] = useState(null);

    useEffect(() => {
        api.get(`/prestamo/${prestamoId}`)
            .then(response => setPrestamo(response.data))
            .catch(error => console.error("Error: ", error));
    }, [prestamoId]);

    if (!prestamo) {
        return <p>El préstamo seleccionado no tiene información.</p>;
    }

    console.log(prestamo);

    // Renderizar el componente
    return (
        <div>
            <h3>Detalle del préstamo</h3>
            <ul>
                <li>Nro: {prestamo.id_prestamo}</li>
                <li>Fecha de inicio: {new Date(prestamo.fecha_inicio).toLocaleDateString()}</li>
                <li>Fecha de fin: {new Date(prestamo.fecha_fin).toLocaleDateString()}</li>
                <li>Persona: {prestamo.persona ? prestamo.persona.nombre : "No asignado"}</li>
                <li>Libro: {prestamo.libro ? prestamo.libro.titulo : "No asignado"}</li>
            </ul>
        </div>
    );
}

export default PrestamoDetalle;
