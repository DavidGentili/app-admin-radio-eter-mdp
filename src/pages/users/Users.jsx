import { React, useState, useEffect } from 'react'

import ModalNewUser from '../../componets/modalNewuser/ModalNewUser'
import ModalUpdateUser from '../../componets/modalUpdateUser/ModalUpdateUser';
import LoadingPage from '../../componets/LoadingPage';
import UserRow from '../../componets/UserRow';

import usersAPI from '../../services/users'
const { getUsers } = usersAPI;

import './users.css';

const UserPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        refreshUsers();
    },[])

    const refreshUsers = () => {
        getUsers()
        .then((data) => {
            setUsers(data.users);
            setLoadingPage(false)
        })
    }

    const selectUser = (user) => {
        return (e) =>{
            e.preventDefault();
            setSelectedUser(user);
        }
    }

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
                            users.map((user) => <UserRow key={user.id} user={user} openModal={selectUser(user)} />)
                        }
                    </tbody>
                </table>
                <button className='primaryBtn' onClick={() => {setOpenModal(true)}}> Nuevo usuario </button>  
            </>
            }
            {openModal && <ModalNewUser refreshUsers={refreshUsers} setLoadingPage={setLoadingPage} closeModal={() => {setOpenModal(false)}} />}
            {selectedUser && <ModalUpdateUser user={selectedUser} refreshUsers={refreshUsers}  closeModal={() => {setSelectedUser(null)}} />}
        </main>
    )
}

export default UserPage
