import { React } from 'react';
import { NavLink } from 'react-router-dom'




const NavIcon = ({ icon, text, goTo }) => {
    return(
        <NavLink to={goTo ? goTo : '/'}><img src={icon} alt={text} /> <span>{text}</span></NavLink>
    )
}

export default NavIcon;