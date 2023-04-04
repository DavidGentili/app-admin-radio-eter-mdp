import React from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'


import './podcastPage.css';
import PodcastProgramPage from './programs/PodcastProgramPage';

export default function PodcastPage() {



    return (
        <main className="podcastPage">
            <div className="navMenu">
                <NavLink to='./programas'> Programas </NavLink>
                <NavLink to='./episodios'> Episodios </NavLink>
            </div>
            <Routes>
                <Route index element={
                    <>
                        <Link to='./programas' className='single'>Programas</Link>
                        <Link to='./episodios' className='single'>Episodios</Link>
                    </>
                } />
                <Route path='/programas/*' element={<PodcastProgramPage/>} />
                <Route path='/episodios/*' element={<></>} />
            </Routes>
        </main>
    )
}
