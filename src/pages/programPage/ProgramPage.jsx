import React, { useState } from 'react'
import {Routes, Route, useNavigate, NavLink} from 'react-router-dom'

import ProgramPanel from './ProgramPanel'
import NewProgramPage from './NewProgramPage'
import ErrorPage from '../errorPage/ErrorPage'
import EditProgramPage from './EditProgramPage'
import TransmissionPanel from './TransmissionPanel'

import { sortElements } from '../../helpers/sortElements'

import './programPage.css';
import NewTransmissionPage from './NewTransmissionPage'


const ProgramPage = () => {

    const [programs, setPrograms] = useState([]);
    const [transmissions, setTransmission] = useState([]);
    const [currentProgram, setCurrentProgram] = useState(null);
    const navigate = useNavigate();

    const selectCurrentProgram = (program) => {
        return ()=> {
            setCurrentProgram(program)
            navigate('./editar');
        };
    }

    return (
        <main className='programPage'>
            <div className="navMenu">
                <NavLink to='./'> Programas </NavLink>
                <NavLink to='./transmisiones'> Transmisiones </NavLink>
                
            </div>
            <Routes>
                <Route path='/' element={ <ProgramPanel {...{programs, setPrograms, selectCurrentProgram, sortProgram: sortElements(programs, setPrograms) }} /> } />
                <Route path='/nuevo' element={ <NewProgramPage /> } />
                <Route path='/editar' element={ <EditProgramPage currentProgram={currentProgram} /> } />
                <Route path='*' element={ <ErrorPage/> } />
                <Route path='/transmisiones' element={ <TransmissionPanel  {...{transmissions, setTransmission, sortTransmission : sortElements(transmissions, setTransmission)}}/> } />
                <Route path='/transmisiones/nueva' element= { <NewTransmissionPage /> } />
            </Routes>

        </main>   
  )
}

export default ProgramPage