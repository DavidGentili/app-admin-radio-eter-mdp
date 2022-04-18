import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import arrow from '../../../assets/arrow.png'

import './header.css'

const Header = ({ userName, location, subMenus }) => {

    const navigate = useNavigate();

    return( 
        <header>
            <div className="actions">
                <button onClick={() => {navigate(-1)}}> <img src={arrow} alt="volver atras" /> </button>
                <h3>{location}</h3>
                <Link to='/my-user'>{userName}</Link>
            </div>

            <div className="subMenus">
                { subMenus &&
                    subMenus.map(option => {
                        return <Link key={option.goTo} to={option.goTo} >{option.text}</Link> 
                    })
                }
            </div>
        </header>
    )
}


export default Header;