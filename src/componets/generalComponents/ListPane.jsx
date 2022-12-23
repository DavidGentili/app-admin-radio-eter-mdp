import React from 'react'
import { Link } from 'react-router-dom';

//Components
import { ChevronIcon } from '../Icons'


const ListPane = ({ elements, headers, sortAction }) => {

    if(!headers)
        return null;

    return (
        <>
            <section className="listPane">
                <div className="headerPanel">
                    {
                        headers.map(header => header.command ? <button key={header.command} onClick={(e) => {sortAction(header.command)}}> {header.field} <ChevronIcon/> </button> : <p key={header.field}>{ header.field }</p> )
                    }
                    <p>Acciones</p>
                </div>
                { elements }
            </section>
            <Link to='./nuevo' className='primaryBtn'> + </Link>
        </>
    )
}

export default ListPane