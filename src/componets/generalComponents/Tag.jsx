import React from 'react'

import { CloseIcon } from '../Icons'

const Tag = ({ value, deleteTag }) => {

    const deleteEvent = (e) => {
        e.preventDefault();
        deleteTag(value);
    }

    return (
        <span className='tag'>{value} <button onClick={deleteEvent}><CloseIcon/></button> </span>
    )
}

export default Tag