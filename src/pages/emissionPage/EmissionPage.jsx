import React from 'react'
import { NavLink, Routes, Route, Link } from 'react-router-dom'

//Components and pages
import ProgramPage from './program/ProgramPage'
import TransmissionPage from './transmission/TransmissionPage'

//Styles
import './emissionPage.css'


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


