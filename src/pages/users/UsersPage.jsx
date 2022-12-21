import { React, useState, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

//Components
import LoadingPage from '../../componets/generalComponents/LoadingPage';
import ErrorPage from '../errorPage/ErrorPage';
import NewUserPage from './NewUserPage';
import UpdateUserPage from './UpdateUserPage';
import UserPanel from './UserPanel';


//Services
import { getUsers } from '../../services/users'

//Styles
import './usersPage.css';


const UsersPage = () => {

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
                    <Route path='' element={ <UserPanel {...{ users, selectUser, setUsers }}/> } />
                    <Route path='nuevo' element={ <NewUserPage {...{ refreshUsers }} /> } />
                    <Route path='editar' element={ <UpdateUserPage {...{ user: selectedUser, refreshUsers }} /> } />
                    <Route path='*' element={ <ErrorPage/> } />
                </Routes>
            </main>
        </>
    )
}

export default UsersPage
