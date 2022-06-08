import { React, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import UserContext from '../context/UserContext';

import Nav from '../componets/nav/Nav';
import Header from '../componets/header/Header'; 
import UserPage from './users/Users';
import MyUser from './myuser/MyUser'
import LoadingPage from '../componets/LoadingPage';

import  { UserIcon, PodcastIcon, ReportsIcon, ProgramsIcon, AdIcon }  from '../componets/Icons';


import userAPI from '../services/users';

const { authUser } = userAPI;

const menuOptions = [
    {
        Icon: PodcastIcon,
        text: 'Podcast',
        goTo: '/podcast',
        aceptedSecurityLevels: ['editor', 'admin', 'master'],
    },
    {
        Icon: ReportsIcon,
        text: 'Informes',
        goTo: '/informes',
        aceptedSecurityLevels: ['editor', 'admin', 'master'],
    },
    {
        Icon: ProgramsIcon,
        text: 'Programas',
        goTo: '/programas',
        aceptedSecurityLevels: ['admin', 'master'],
    },
    {
        Icon: AdIcon,
        text: 'Publicidad',
        goTo: '/publicidad',
        aceptedSecurityLevels: ['admin', 'master'],
    },
    {
        Icon: UserIcon,
        text: 'Usuarios',
        goTo: '/usuarios',
        aceptedSecurityLevels: ['master'],
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
                {/* <Nav menuOptions={ menuOptions.filter(option => option.goTo === '/usuarios')}/> */}
                <Nav menuOptions={ user ? 
                    menuOptions.filter(function(option){ 
                        if(option.aceptedSecurityLevels.includes(user.securityLevel))
                            return option;
                        }) 
                    : []}/>

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