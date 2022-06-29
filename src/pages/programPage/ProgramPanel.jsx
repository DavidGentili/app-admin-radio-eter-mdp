import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getPrograms } from '../../services/programs'
import { ChevronIcon } from '../../componets/Icons';
import SingleProgram from '../../componets/SingleProgram';

const ProgramPanel = ({ programs, setPrograms, selectCurrentProgram, sortProgram}) => {

    
    useEffect(() => {
        getPrograms()
        .then(({ data }) => {
            setPrograms(data);
        })
    }, [])

    return (
        <>
            <div className='programPanel'>
                <div className="headerPanel">
                    <button onClick={(e) => {sortProgram('name')}}>Nombre <ChevronIcon/> </button>
                    <p>Dias</p>
                    <button onClick={(e) => {sortProgram('highlighted')}}>Destacado <ChevronIcon/> </button>
                    <p>Inicio</p>
                    <p>Fin</p>
                    <p>Acciones</p>
                </div>
                { programs.length !== 0 &&
                    programs.map(program => <SingleProgram key={program.id} {...program} selectCurrentProgram={selectCurrentProgram(program)} />)
                }
            </div>
            <Link to='./nuevo' className='primaryBtn'> + </Link>
        </>
    )
}

export default ProgramPanel