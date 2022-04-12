import React from 'react'

import Header from '../../componets/general/header/Header'

const UserPage = () => {
    return (
        <Header 
        userName='Carlos' 
        location={'Usuarios'} 
        subMenus={[
            {text: 'Usuarios', goTo: '/usuarios'},
            {text: 'Otro', goTo: '/usuarios/otro'}    
        ]} />
    )
}

export default UserPage
