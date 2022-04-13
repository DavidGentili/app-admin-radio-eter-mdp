import { React, useState, useEffect } from 'react'

import ModalNewUser from '../../componets/modalNewuser/ModalNewUser'
import edit from '../../../assets/edit.png'
import LoadingPage from '../../componets/LoadingPage';

import usersAPI from '../../services/users'
const { getUsers } = usersAPI;

import './users.css';

const UserPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
        .then((data) => {
            console.log(data);
            setUsers(data.users);
            setLoadingPage(false)
        })
        
    },[])

    return (
        <main style={loadingPage ? {position:'relative'} : {}}>
            {loadingPage ? <LoadingPage />
            :
            <>
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
                        {
                            users.length === 0 ? <p>No hay usuarios</p>
                            :
                            users.map((user) => {
                                return(
                                    <tr key={user.id}>
                                        <th>{user.name}</th>
                                        <th>{user.email}</th>
                                        <th>{user.securityLevel}</th>
                                        <th>{user.state}</th>
                                        <th><button><img src={edit} alt="Editar" /></button></th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <button className='primaryBtn' onClick={() => {setOpenModal(true)}}> Nuevo usuario </button>  
            </>
            }
            {openModal && <ModalNewUser closeModal={() => {setOpenModal(false)}} />}
        </main>
    )
}

export default UserPage
