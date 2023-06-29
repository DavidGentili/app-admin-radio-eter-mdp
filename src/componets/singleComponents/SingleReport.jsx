import React from 'react'

//Componets
import { EditIcon } from '../Icons';

const SingleReport = ( props ) => {
    const { title, active, creatorName, lastModify, selectReport = () => {}} = props;


    return (
        <div className="single">
            <p>{title}</p>
            {active ? <p>Publicado</p> : <p>Borrador</p>}
            <p>{creatorName}</p>
            <p> { `${lastModify.toLocaleDateString()} - ${lastModify.toLocaleTimeString()}` } </p>
            <button onClick={selectReport}> <EditIcon/></button>
        </div>
    )
}

export default SingleReport