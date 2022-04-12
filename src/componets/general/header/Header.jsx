import { React } from 'react';
import { Link } from 'react-router-dom'

import arrow from '../../../../assets/arrow.png'

import './header.css'

const Header = ({ userName, location, subMenus }) => {
    return( 
        <header>
            <div className="actions">
                <button> <img src={arrow} alt="volver atras" /> </button>
                <h3>{location}</h3>
                <Link to='/myUser'>{userName}</Link>
            </div>

            <div className="subMenus">
                {
                    subMenus.map(option => {
                        return <Link key={option.goTo} to={option.goTo} >{option.text}</Link> 
                    })
                }
            </div>
        </header>
    )
}


export default Header;