import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Biblioteca</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/prestamos">Prestamos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/prestamo/crear">Crear Prestamo </Link> 
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/personas">Personas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/persona/crear">Crear Persona</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/libros">Libros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/libro/crear">Crear Libro</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;