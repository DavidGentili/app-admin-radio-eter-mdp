import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/login/Login'
import PanelPage from './pages/PanelPage';
import MessageContext from './context/MessageContext';
import UIMessage from './componets/UIMessage';

import './App.css'

function App() {

    const [message, setMessage] = useState({message : '', type : 'normal'})

    const cleanMessage = () => {
        setMessage({ message: '', type : 'normal'});
    }

    return (
        <div className="App">
            <MessageContext.Provider value={{ setMessage }}>
                <Routes>
                    <Route path='/login' element={ <Login/> } />
                    <Route path='/*' element={<PanelPage />} />
                </Routes>
                { message.message.length > 0 && <UIMessage text={message.message} type={message.type} cleanMessage={cleanMessage}/>}
            </MessageContext.Provider>
        </div>
    )
}

export default App
