import { React, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

//Componets
import Login from './pages/login/Login'
import PanelPage from './pages/PanelPage';
import UIMessage from './componets/UIMessage';
import ModalConfirm from './componets/modals/ModalConfirm';

//Context
import ConfirmMessageContext from './context/ConfirmMessageContext';
import MessageContext from './context/MessageContext';

//Styles
import './App.css'


const initialConfirmMessage = {
    text : '',
    callback : null,
}

const initialMessage = {
    message : '',
    type : 'normal',
}

const fun = () => {
    console.log('hola');
}

function App() {

    const [message, setMessage] = useState(initialMessage)
    const [confirmMessage, setConfirmMessage] = useState({initialConfirmMessage});

    const clearCallBack = () => {
        setConfirmMessage(initialConfirmMessage);
    }

    const cleanMessage = () => {
        setMessage(initialMessage);
    }


    return (
        <div className="App">
            <MessageContext.Provider value={{ setMessage }}>
            <ConfirmMessageContext.Provider value={{ setConfirmMessage }} >
                <Routes>
                    <Route path='/login' element={ <Login/> } />
                    <Route path='/*' element={<PanelPage />} />
                </Routes>
                { confirmMessage && confirmMessage.callback && <ModalConfirm text={confirmMessage.text} callback={confirmMessage.callback} clearCallback={clearCallBack} />}
                { message.message.length > 0 && <UIMessage text={message.message} type={message.type} cleanMessage={cleanMessage}/>}
            </ConfirmMessageContext.Provider>
            </MessageContext.Provider>
        </div>
    )
}

export default App
