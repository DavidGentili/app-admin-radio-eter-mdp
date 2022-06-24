import React from 'react'

const SingleProgram = (props) => {

    const { name, startHour, finishHour, days, highlighted } = props;

    return (
        <div className="single">
                <p>{name}</p>
                
                <button onClick={() => {}}> <EditIcon/></button>
            </div>
    )
}

export default SingleProgram