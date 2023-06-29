import React from 'react'

import { EditIcon } from '../Icons'

export default function SingleEpisode({ title, podcastTitle, active, order, selectEpisode }) {
    return (
        <div className="single">
            <p>{title}</p>
            <p>{podcastTitle}</p>
            <p>{active ? 'Activo' : 'No activo'}</p>
            <button onClick={selectEpisode}> <EditIcon /></button>
        </div>
    )
}
