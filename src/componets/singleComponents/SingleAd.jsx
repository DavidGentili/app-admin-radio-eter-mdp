import React from 'react'

import { EditIcon } from '../Icons';

const SingleAd = (props) => {

    const { name, link, type, urlImage, selectAd} = props;

    return (
        <div className="single">
            <p>{name}</p>
            {link ? <p>{ link }</p> : <span>No hay link</span>}
            <p>{type}</p>
            <button onClick={selectAd}> <EditIcon/></button>
        </div>
    )
}

export default SingleAd