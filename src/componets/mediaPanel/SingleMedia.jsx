import React from 'react'

import { TrashIcon } from '../Icons';

import useConfirmMessage from '../../hooks/useConfirmMessage';

const SingleMedia = ({ file, selectFile, isSelect, deleteEvent}) => {
    const { url, name } = file;

    const setConfirmMessage = useConfirmMessage();

    const selectEvent = (e) => {
        selectFile(file);
    }

    const deleteFileEvent = (e) => {
        setConfirmMessage({
            text : 'esta seguro que desea eliminar el archivo',
            callback: deleteEvent(e, file.id),
        })
    }

    return (
        <article className={`singleMedia single ${isSelect ? 'select' : ''}`} onClick={selectEvent} >
            <img src={url} alt={name} loading='lazy'/>
            <h6> { name } </h6>
            <button onClick={deleteFileEvent}> <TrashIcon/> </button>
        </article>
    )
}

export default SingleMedia