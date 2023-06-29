import { React, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

//Componets
import Login from './pages/login/Login'
import PanelPage from './pages/PanelPage';
import UIMessage from './componets/generalComponents/UIMessage';
import Modal from './componets/modals/Modal';

//Context
import MessageContext from './context/MessageContext';

//Styles
import './App.css'
import ModalContext from './context/ModalContext';


const initialConfirmMessage = {
    text : '',
    callback : null,
}

const initialMessage = {
    message : '',
    type : 'normal',
}

function App() {

    const [message, setMessage] = useState(initialMessage)
    const [modal, setModal] = useState()

    const cleanMessage = () => {
        setMessage(initialMessage);
    }

    const closeModal = () => {
        setModal({
            data : undefined,
            type : undefined,
            callback : undefined,
        })
    }

    const openModal = (type, callback) => {
        if(type && callback)
            setModal({ type, callback })
    }

    const isOpenModal = () => modal.callback && modal.type;


    return (
        <div className="App">
            <MessageContext.Provider value={ setMessage }>
            <ModalContext.Provider value={ setModal } >
            
                <Routes>
                    <Route path='/login' element={ <Login/> } />
                    <Route path='/*' element={<PanelPage />} />
                </Routes>
                {isOpenModal && <Modal {...{closeModal, ...modal}} /> }            
                { message.message && message.message.length > 0 && <UIMessage {...{text: message.message, type : message.type, cleanMessage }}/>}
            </ModalContext.Provider>
            </MessageContext.Provider>
        </div>
    )
}

export default App
