import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getPrograms } from '../../services/programs'
import SingleProgram from '../../componets/SingleProgram';

const ProgramPanel = ({ programs, setPrograms, selectCurrentProgram}) => {

    
    useEffect(() => {
        getPrograms()
        .then(({ data }) => {
            setPrograms(data);
        })
    }, [])

    return (
        <>
            <div className='programPanel'>
                { programs.length !== 0 &&
                    programs.map(program => <SingleProgram key={program.id} {...program} selectCurrentProgram={selectCurrentProgram(program)} />)
                }
            </div>
            <Link to='./nuevo' className='primaryBtn'> + </Link>
        </>
    )
}

export default ProgramPanel