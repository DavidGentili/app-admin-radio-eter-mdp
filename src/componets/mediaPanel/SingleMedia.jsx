import React from 'react'

import { TrashIcon } from '../Icons';

const SingleMedia = ({ file, selectFile, isSelect, deleteEvent}) => {
    const { url, name } = file;

    const selectEvent = (e) => {
        selectFile(file);
    }

    return (
        <article className={`singleMedia single`} onClick={selectEvent} >
            <img src={url} alt={name} />
            <h6> { name } </h6>
            <button onClick={deleteEvent(file.id)}> <TrashIcon/> </button>
        </article>
    )
}

export default SingleMedia