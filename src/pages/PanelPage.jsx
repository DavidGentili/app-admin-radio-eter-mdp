import { React, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import UserContext from '../context/userContext';

import Nav from '../componets/nav/Nav';
import Header from '../componets/header/Header'; 
import UserPage from './users/Users';
import MyUser from './myuser/MyUser'
import LoadingPage from '../componets/LoadingPage';

import podcastIcon from '../../assets/podcast.png';
import reportsIcon from '../../assets/reports.png';
import programsIcon from '../../assets/programs.png';
import adIcon from '../../assets/ad.png';
import userIcon from '../../assets/user.png';

import userAPI from '../services/users';

const { authUser } = userAPI;

const menuOptions = [
    {
        icon: podcastIcon,
        text: 'Podcast',
        goTo: '/podcast',
        securtyRequired: 'editor',
    },
    {
        icon: reportsIcon,
        text: 'Informes',
        goTo: '/informes',
        securtyRequired: 'editor',
    },
    {
        icon: programsIcon,
        text: 'Programas',
        goTo: '/programas',
        securtyRequired: 'editor',
    },
    {
        icon: adIcon,
        text: 'Publicidad',
        goTo: '/publicidad',
        securtyRequired: 'admin',
    },
    {
        icon: userIcon,
        text: 'Usuarios',
        goTo: '/usuarios',
        securtyRequired: 'master',
    }
]

const PanelPage = () => {

    const [loadingPage, setLoadingPage] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        authUser()
        .then((data) => {
            setLoadingPage(false);
            setUser(data);
        })
        .catch((e) => {
            navigate('/login');
        })
    },[]);
    
    
    return (
        <UserContext.Provider value={user}>{ 
            loadingPage ? <LoadingPage />
            :
            <div className='panelPage'>
                <Nav menuOptions={ menuOptions.filter(option => option.goTo === '/usuarios')}/>
                <Header userName={user ? user.name : 'Mi usuario'} location={'Usuarios'} />
                
                <Routes >
                    <Route path='/usuarios' element={<UserPage />} />
                    <Route path='/my-user' element={ <MyUser/> } />
                    <Route path='/' element={<UserPage />} />
                    <Route path='*' element={ <h3>No esta </h3>}/>
                </Routes>
            
            </div>
        }</UserContext.Provider>
    )
}

export default PanelPage