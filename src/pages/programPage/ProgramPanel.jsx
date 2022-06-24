import React, { useEffect, useState } from 'react'

import { getPrograms } from '../../services/programs'

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

        </div>
    )
}

export default ProgramPanel