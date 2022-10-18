import React from 'react'

const SingleMedia = ({ file, selectFile, isSelect}) => {
    const { url, name } = file;

    const selectEvent = (e) => {
        selectFile(file);
    }

    return (
        <article className={`singleMedia single ${isSelect && 'select'}`} onClick={selectEvent} >
            <img src={url} alt={name} />
            <h6>{name}</h6>
        </article>
    )
}

export default SingleMedia