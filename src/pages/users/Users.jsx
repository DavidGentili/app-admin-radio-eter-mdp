import { React, useState } from 'react'

import Header from '../../componets/header/Header'
import ModalNewUser from '../../componets/modalNewuser/ModalNewUser'
import edit from '../../../assets/edit.png'

import './users.css';

const UserPage = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
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

                <button 
                className='primaryBtn'
                onClick={() => {setOpenModal(true)}}>
                    Nuevo usuario
                </button>
            </main>
            {openModal && <ModalNewUser closeModal={() => {setOpenModal(false)}} />}
        </>
    )
}

export default UserPage
