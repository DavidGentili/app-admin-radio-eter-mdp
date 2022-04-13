import { React } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/login/Login'
import PanelPage from './pages/PanelPage';

import './App.css'

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/login' element={ <Login/> } />
                <Route path='/*' element={<PanelPage />} />
            </Routes>
        </div>
    )
}

export default App
