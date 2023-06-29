import React from 'react'

import { EditIcon } from '../Icons'

export default function SinglePodcast({ title, tags, active, selectPodcast }) {

    return (
        <div className="single">
            <p>{title}</p>
            <p>{active ? 'Activo' : 'No activo'}</p>
            <button onClick={selectPodcast}> <EditIcon /></button>
        </div>
    )
}
