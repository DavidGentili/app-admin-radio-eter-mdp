import React, { useEffect, useState } from 'react'

import { getPrograms } from '../../services/programs'
import SingleProgram from '../../componets/SingleProgram';

const ProgramPanel = () => {

    const [ programs, setPrograms] = useState([]);
    
    useEffect(() => {
        getPrograms()
        .then(({ data }) => {
            setPrograms(data);
        })
    }, [])

    return (
        <div className='programPanel'>
            { programs.length !== 0 &&
                programs.map(program => <SingleProgram key={program.id} {...program} />)
            }
        </div>
    )
}

export default ProgramPanel