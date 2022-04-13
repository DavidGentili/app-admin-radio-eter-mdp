import React from 'react'

import Header from '../../componets/general/header/Header'
import edit from '../../../assets/edit.png'

import './users.css';

const UserPage = () => {
    return (
        <>
            <Header 
            userName='Carlos' 
            location={'Usuarios'} 
            subMenus={[
                {text: 'Usuarios', goTo: '/usuarios'},   
            ]} />
            <main>

                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Mail</th>
                            <th>Nivel</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr>
                            <th>Carlos</th>
                            <th>Carlos@mail.com</th>
                            <th>Master</th>
                            <th>Activo</th>
                            <th><button><img src={edit} alt="Editar" /></button></th>
                        </tr>
                    </tbody>
                </table>

                <button>Nuevo usuario</button>
            </main>
        </>
    )
}

export default UserPage
