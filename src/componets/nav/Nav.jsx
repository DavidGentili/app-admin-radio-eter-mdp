import { React, useState } from 'react';

import NavIcon from './NavIcon'

import { MenuIcon } from '../Icons';

import './nav.css'


const Nav = ({ menuOptions }) => {

    const [collapsed, setCollapsed] = useState(false);

    const collapsedHandler = (e) => {
        e.preventDefault();
        setCollapsed(!collapsed);
    }

    return(
        <nav className={collapsed ? 'collapsed' : ''} >
            <button onClick={collapsedHandler} > <MenuIcon/> </button>
            <div className="menuOptions">
            {
                menuOptions.map(option => <NavIcon key={option.goTo} {...option} />)
            }
            </div>
        </nav>
    )
}

export default Nav;