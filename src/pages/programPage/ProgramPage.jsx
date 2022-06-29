import React, { useCallback, useState } from 'react'
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

    const sortProgram = useCallback(function(key){
        if(programs[0][key] !== undefined){
            const sortArray = [... programs];
            sortArray.sort(function(a , b){
                if(typeof(a[key]) === 'boolean')
                    return (a[key] === false && b[key] === true) ? 1 : -1;
                if(typeof(a[key] === 'string'))
                    return (a[key].toLowerCase() <= b[key].toLowerCase()) ? -1 : 1;
                return (a[key] <= b[key]) ? -1 : 1; 

            });
            setPrograms(sortArray);
        }
    }, [programs]);

    return (
        <main className='programPage'>
            <Routes>
                <Route path='/' element={ <ProgramPanel programs={programs} setPrograms={setPrograms} selectCurrentProgram={selectCurrentProgram} sortProgram={sortProgram} /> } />
                <Route path='/nuevo' element={ <NewProgramPage /> } />
                <Route path='/editar' element={ <EditProgramPage currentProgram={currentProgram} /> } />
                <Route path='*' element={ <ErrorPage/> } />
            </Routes>

        </main>   
  )
}

export default ProgramPage