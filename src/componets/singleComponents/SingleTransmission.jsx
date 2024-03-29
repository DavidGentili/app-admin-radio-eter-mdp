import React from 'react'

import { EditIcon } from '../Icons';

const SingleTransmission = (props) => {
    
    const { name, active } = props;
    const startTransmission = new Date(props.startTransmission)
    const finishTransmission = new Date(props.finishTransmission)
    const { selectTransmission } = props;

    return (
        <div className="single">
            <p>{name}</p>
            <p>{active ? 'activo' : 'inactivo'}</p>
            <p>{`${startTransmission.toLocaleDateString()} - ${startTransmission.toLocaleTimeString()}`}</p>
            <p>{`${finishTransmission.toLocaleDateString()} - ${finishTransmission.toLocaleTimeString()}`}</p>
            <button onClick={selectTransmission} > <EditIcon/></button>
        </div>
    )
}

export default SingleTransmission