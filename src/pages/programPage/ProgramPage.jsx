import React, { useState } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'

import ProgramPanel from './ProgramPanel'
import NewProgramPage from './NewProgramPage'
import ErrorPage from '../errorPage/ErrorPage'
import EditProgramPage from './EditProgramPage'

import './programPage.css';

const ProgramPage = () => {

    const [programs, setPrograms] = useState([]);
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
            <Routes>
                <Route path='/' element={ <ProgramPanel programs={programs} setPrograms={setPrograms} selectCurrentProgram={selectCurrentProgram} /> } />
                <Route path='/nuevo' element={ <NewProgramPage /> } />
                <Route path='/editar' element={ <EditProgramPage currentProgram={currentProgram} /> } />
                <Route path='*' element={ <ErrorPage/> } />
            </Routes>

        </main>   
  )
}

export default ProgramPage