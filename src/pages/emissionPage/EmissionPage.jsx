import React from 'react'
import { NavLink, Routes, Route, Link } from 'react-router-dom'

import './emissionPage.css'

import ProgramPage from './program/ProgramPage'
import TransmissionPage from './transmission/TransmissionPage'

const EmissionPage = () => {
    return (
        <main className='emissionPage'>
            <div className="navMenu">
                <NavLink to='./programas'> Programas </NavLink>
                <NavLink to='./transmisiones'> Transmisiones </NavLink>
            </div>

            <Routes >
                <Route path='' element={ <>
                    <Link to='./programas' className='single'>Programas</Link>
                    <Link to='./transmisiones' className='single'>Transmisiones</Link>
                </> }/>
                <Route path='/programas/*' element= { <ProgramPage /> } />
                <Route path='/transmisiones/*' element= { <TransmissionPage /> } />
            </Routes>



        </main>
    )
}

export default EmissionPage


