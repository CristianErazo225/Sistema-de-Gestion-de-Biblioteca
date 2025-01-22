import React, {useEffect, useState} from "react";
import api from "../axiosConfig";

function CrearPersona() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        const newPersona = { nombre, apellido, email};
        console.log(newPersona);
        api.post('/persona/crear/persona', newPersona)
            .then(response => {
                console.log('Persona creada: ', response.data);
                setNombre('');
                setApellido('');
                setEmail('');
            })
            .catch(error => console.error("Error al crear la persona: ", error));
    };

    return (
        <div>
            <h3>Nombre</h3>
            <input className="form-control" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <br />
            <h3>Apellido</h3>
            <input className="form-control" type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <br />
            <h3>email</h3>
            <input className="form-control" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>Guardar</button>
        </div>
    );
}

export default CrearPersona;
