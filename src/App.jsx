import { React } from 'react'

import Nav from './componets/general/nav/Nav'
import UserPage from './pages/users/Users'

import Login from './pages/login/Login'


import podcastIcon from '../assets/podcast.png';
import reportsIcon from '../assets/reports.png';
import programsIcon from '../assets/programs.png';
import adIcon from '../assets/ad.png';
import userIcon from '../assets/user.png';

const menuOptions = [
    {
        icon: podcastIcon,
        text: 'Podcast',
        goTo: '/podcast',
    },
    {
        icon: reportsIcon,
        text: 'Informes',
        goTo: '/informes',
    },
    {
        icon: programsIcon,
        text: 'Programas',
        goTo: '/programas',
    },
    {
        icon: adIcon,
        text: 'Publicidad',
        goTo: '/publicidad',
    },
    {
        icon: userIcon,
        text: 'Usuarios',
        goTo: '/usuarios',
    }
]



import './App.css'

function App() {

    return (
        <div className="App grid">
            <Nav menuOptions={ menuOptions.filter(option => option.goTo === '/usuarios')}/>
            <UserPage />

            {/* <Login /> */}
        </div>
    )
}

export default App
