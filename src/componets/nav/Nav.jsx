import { React, useState } from 'react';

import NavIcon from './NavIcon'
import menuIcon from '../../../assets/menu.png';


import './nav.css'


const Nav = ({ menuOptions }) => {

    const [collapsed, setCollapsed] = useState(false);

    const collapsedHandler = (e) => {
        e.preventDefault();
        setCollapsed(!collapsed);
    }

    return(
        <nav className={collapsed ? 'collapsed' : ''} >
            <button onClick={collapsedHandler} ><img src={menuIcon} alt="" /></button>
            <div className="menuOptions">
            {
                menuOptions.map(option => <NavIcon key={option.goTo} {...option} />)
            }
            </div>
        </nav>
    )
}

export default Nav;