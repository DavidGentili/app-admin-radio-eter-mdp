import { React, useState, useEffect, useCallback } from 'react'

import ModalNewUser from '../../componets/modals/ModalNewUser'
import ModalUpdateUser from '../../componets/modals/ModalUpdateUser';
import LoadingPage from '../../componets/LoadingPage';
import SingleUser from '../../componets/SingleUser';

import { ChevronIcon } from '../../componets/Icons'

import usersAPI from '../../services/users'
const { getUsers } = usersAPI;

import './usersPage.css';

const UsersPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        refreshUsers();
    },[])

    const sortUser = useCallback((key) => {
        const sortArray = [...users]
        sortArray.sort(function(a ,b ){
            return (a[key] <= b[key]) ? -1 : 1
        })

        setUsers(sortArray);
    }, [users])

    const refreshUsers = () => {
        if(!loadingPage)
            setLoadingPage(true);
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

    if(loadingPage)
        return ( <main className='userMain'> <LoadingPage/> </main>)

    return (
        <>
            <main className='usersMain'>
                <section className='userPanel'>
                    <div className="headerPanel">
                        <button onClick={(e) => {sortUser('name')}}>Usuario <ChevronIcon/> </button>
                        <button onClick={(e) => {sortUser('email')}}>Mail <ChevronIcon/></button>
                        <button onClick={(e) => {sortUser('securityLevel')}}>Nivel de seguridad <ChevronIcon/></button>
                        <button onClick={(e) => {sortUser('state')}}>Estado <ChevronIcon/></button>
                        <p>Acciones</p>
                    </div>
                    {
                        users.length === 0 ? <p>No hay usuarios</p>
                        :
                        users.map((user) => <SingleUser key={user.id} user={user} selectUser={selectUser(user)} />)
                    }
                </section>
                <button className='primaryBtn' onClick={() => {setOpenModal(true)}}> + </button>  
            </main>
            {openModal && <ModalNewUser refreshUsers={refreshUsers} setLoadingPage={setLoadingPage} closeModal={() => {setOpenModal(false)}} />}
            {selectedUser && <ModalUpdateUser user={selectedUser} refreshUsers={refreshUsers}  closeModal={() => {setSelectedUser(null)}} />}
        </>
    )
}

export default UsersPage
