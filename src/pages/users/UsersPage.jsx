import { React, useState, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

//Components
import ModalNewUser from '../../componets/modals/ModalNewUser'
import ModalUpdateUser from '../../componets/modals/ModalUpdateUser';
import LoadingPage from '../../componets/generalComponents/LoadingPage';
import ErrorPage from '../errorPage/ErrorPage';
import NewUserPage from './NewUserPage';
import UpdateUserPage from './UpdateUserPage';


//Services
import { getUsers } from '../../services/users'

//Styles
import './usersPage.css';

//Hooks
import useModal from '../../hooks/useModal';
import UserPanel from './UserPanel';

const UsersPage = () => {

    const { openModal, openModalEvent, closeModalEvent } = useModal(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        refreshUsers();
    },[])

    const refreshUsers = () => {
        if(!loadingPage)
            setLoadingPage(true);
        getUsers()
        .then((data) => {
            setUsers(data);
            setLoadingPage(false)
        })
    }

    const selectUser = (user) => {
        return (e) =>{
            e.preventDefault();
            setSelectedUser(user);
            navigate('./editar');
        }
    }

    if(loadingPage)
        return ( <main className='userMain'> <LoadingPage/> </main>)

    return (
        <>
            <main className='usersMain'>
                <Routes>
                    <Route path='nuevo' element={ <NewUserPage /> } />
                    <Route path='' element={ <UserPanel {...{users, selectUser, setUsers }}/> } />
                    <Route path='editar' element={ <UpdateUserPage {...{ selectedUser, refreshUsers }} /> } />
                    <Route path='*' element={ <ErrorPage/> } />
                </Routes>
            </main>
            {/* {openModal && <ModalNewUser refreshUsers={refreshUsers} setLoadingPage={setLoadingPage} closeModal={closeModalEvent} />} */}
            {/* {selectedUser && <ModalUpdateUser user={selectedUser} refreshUsers={refreshUsers}  closeModal={() => {setSelectedUser(null)}} />} */}
        </>
    )
}

export default UsersPage
