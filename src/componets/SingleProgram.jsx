import React from 'react'

import { EditIcon } from './Icons';

const arrayOfDays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const SingleProgram = (props) => {

    const { name, startHour, finishHour, days, highlighted } = props;

    return (
        <div className="single">
                <p>{name}</p>
                <div className="days">
                    {arrayOfDays.map(function(day,i){
                        return <span key={day} className={(days[i] ? 'activeDay' : '')}>{day}</span>
                    })}
                </div>
                <p className={highlighted ? 'highlighted' : 'normal' }>Destacado</p>
                <p>{startHour}</p>
                <p>{finishHour}</p>
                <button onClick={() => {}}> <EditIcon/></button>
            </div>
    )
}

export default SingleProgram