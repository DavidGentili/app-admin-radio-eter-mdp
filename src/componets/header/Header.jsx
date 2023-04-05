import { React } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'


import { ArrowIcon, HomeIcon } from '../Icons';

import './header.css'

const Header = ({ userName, location, subMenus }) => {

    const navigate = useNavigate();

    return( 
        <header>
            <div className="actions">
                <button onClick={() => {navigate(-1)}}> <ArrowIcon/> </button>
                <NavLink to='/'> <HomeIcon/> </NavLink>
                <Link to='/my-user'>{userName}</Link>
            </div>
{/* 
            <div className="subMenus">
                { subMenus &&
                    subMenus.map(option => {
                        return <Link key={option.goTo} to={option.goTo} >{option.text}</Link> 
                    })
                }
            </div> */}
        </header>
    )
}


export default Header;