import React, { useEffect, useState } from 'react'

//Components
import { ChevronIcon } from '../../../componets/Icons';
import SingleProgram from '../../../componets/singleComponents/SingleProgram';
import LoadingPage from '../../../componets/generalComponents/LoadingPage';

//Services
import { getPrograms } from '../../../services/programs'
import ListPane from '../../../componets/generalComponents/ListPane';


const ProgramPanel = ({ programs, setPrograms, selectCurrentProgram, sortProgram}) => {

    const [loadingPanel, setLoadingPanel] = useState(true);
    
    useEffect(() => {
        getPrograms()
        .then(({ data }) => {
            setPrograms(data);
            setLoadingPanel(false)
        })
    }, [])

    const headers = [
        {
            command : 'name',
            field : 'Nombre',
        },
        {
            command : undefined,
            field : 'Dias'
        },
        {
            command : 'highlighted',
            field : 'Destacado',
        },
        {
            command : undefined,
            field : 'Inicio',
        },
        {
            command : undefined,
            field : 'Fin',
        },
    ]

    const singles = programs.map(program => <SingleProgram key={program.id} {...program} selectCurrentProgram={selectCurrentProgram(program)} />);

    if(loadingPanel)
        return <LoadingPage />

    return <ListPane headers={headers} elements={singles} sortAction={sortProgram}/>
}

export default ProgramPanel