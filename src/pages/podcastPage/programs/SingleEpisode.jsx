import React from 'react'

export default function SingleEpisode({draggableProvided, ep}) {

    const { dragHandleProps, draggableProps, innerRef } = draggableProvided;

    return (
        <div className="episode"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}>

            <p className="order">#{ep.order + 1}</p>
            <p>{ep.title}</p>
        </div>
    )
}
