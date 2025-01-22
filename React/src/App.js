//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from './reserva_components/Navbar';

//importaciones reserva_components
import CrearReserva from './reserva_components/ReservaCrear';
import ReservasList from './reserva_components/ReservaList';
import ActualizarReserva from './reserva_components/ActualizarReserva';

//importaciones prestamo_components
import PrestamosList from './prestamo_component/PrestamoList';
import CrearPrestamo from './prestamo_component/PrestamoCrear';
import ActualizarPrestamo from './prestamo_component/ActualizarPrestamo';

import PersonasList from './persona_component/PersonaList';
import CrearPersona from './persona_component/PersonaCrear';
import ActualizarPersona from './persona_component/ActualizarPersona';

import LibrosList from './libro_component/LibroList';
import CrearLibro from './libro_component/LibroCrear';
import ActualizarLibro from './libro_component/ActualizarLibro';

function App() {
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedLibro, setSelectedLibro] = useState(null);


  return (
    <Router>
      <div>
        <Navbar/>
        <div className='container mt-4'>
          <Routes>
            <Route path='/' element={<h2>Sistema De Biblioteca</h2> } />
            <Route path='/reservas' element={<ReservasList onSelectReserva={setSelectedReserva} />} />
            <Route path='/reserva/crear' element={<CrearReserva />} />
            <Route path='/reserva/actualizar/:id' element={<ActualizarReserva reserva={selectedReserva} />} />

            
            <Route path='/prestamos' element={<PrestamosList onSelectPrestamo={setSelectedPrestamo} />} />
            <Route path='/prestamo/crear' element={<CrearPrestamo />} />
            <Route path='/prestamo/actualizar/:id' element={<ActualizarPrestamo prestamo={selectedPrestamo} />} />

            <Route path='/personas' element={<PersonasList onSelectPersona={setSelectedPersona} />} />
            <Route path='/persona/crear' element={<CrearPersona />} />
            <Route path='/persona/actualizar/:id' element={<ActualizarPersona persona={selectedPersona} />} /> 

            <Route path='/libros' element={<LibrosList onSelectLibro={setSelectedLibro} />} />
            <Route path='/libro/crear' element={<CrearLibro />} />
            <Route path='/libro/actualizar/:id' element={<ActualizarLibro libro={selectedLibro} />} />  
           

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
