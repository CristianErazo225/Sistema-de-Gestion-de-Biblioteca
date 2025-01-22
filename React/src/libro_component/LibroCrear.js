import React, {useEffect, useState} from "react";
import api from "../axiosConfig";

function CrearLibro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [anio_publicacion, setAnio_publicacion] = useState('');

    const handleSubmit = () => {
        const newLibro = { titulo, autor, anio_publicacion};
        console.log(newLibro);
        api.post('/libro/crear/libro', newLibro)
            .then(response => {
                console.log('libro creado: ', response.data);
                setTitulo('');
                setAutor('');
                setAnio_publicacion('');
            })
            .catch(error => console.error("Error al crear el libro: ", error));
    };

    return (
        <div>
            <h3>Titulo</h3>
            <input className="form-control" type="text" placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            <br />
            <h3>Autor</h3>
            <input className="form-control" type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
            <br />
            <h3>Año de publicacion</h3>
            <input className="form-control" type="number" placeholder="Año" value={anio_publicacion} onChange={(e) => setAnio_publicacion(e.target.value)} />
            <br />
            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>Guardar</button>
        </div>
    );
}

export default CrearLibro;
