import React from 'react'

//Componets
import { EditIcon } from '../Icons';

const SinglePlatformContent = (props) => {
    const { name, type, contents, selectPlatformContent } = props;

    return (
        <div className="single">
            <p>{name}</p>
            <p>{type}</p>
            <p>{contents.length > 0 ? contents.length : 'No hay contenido'}</p>
            <button onClick={selectPlatformContent}> <EditIcon /></button>
        </div>
    )
}

export default SinglePlatformContent