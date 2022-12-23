import React, { useState } from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom'

//Components and pages
import ProgramPanel from './ProgramPanel'
import NewProgramPage from './NewProgramPage'
import EditProgramPage from './EditProgramPage'
import ErrorPage from '../../errorPage/ErrorPage'


import { sortElements } from '../../../helpers/sortElements'

const ProgramPage = () => {

    const [programs, setPrograms] = useState([]);
    const [currentProgram, setCurrentProgram] = useState(null);
    const navigate = useNavigate();

    const selectCurrentProgram = (program) => {
        return (e) => {
            setCurrentProgram(program)
            navigate('./editar');
        };
    }

    return (
        <div className='programPage'>  
            <Routes>
                <Route path='' element={ <ProgramPanel {...{programs, setPrograms, selectCurrentProgram, sortProgram: sortElements(programs, setPrograms) }} /> } />
                <Route path='/nuevo' element={ <NewProgramPage /> } />
                <Route path='/editar' element={ <EditProgramPage currentProgram={currentProgram} /> } />
                <Route path='*' element={ <ErrorPage/> } />
            </Routes>
        </div>   
  )
}

export default ProgramPage