import { React, useState } from 'react'

import close from '../../../assets/close.png'
import usersAPI from '../../services/users';

const { signupUser } = usersAPI;

import './modalNewUser.css'

const ModalNewUser = ({ closeModal, refreshUsers, setLoadingPage }) => {

    const [messageError, setMessageError] = useState('');

    const handlerNewUser = (e) => {
        e.preventDefault();
        const {name, email, securityLevel} = Object.fromEntries(new FormData(e.target));
        signupUser({name, email, securityLevel})
        .then((data) => {
            setLoadingPage(true);
            closeModal();
            refreshUsers();
        })
        .catch((e) => {
            setMessageError(e);
        })
        
    } 

    return (
        <section className='modalContainer'>
            <div className='modalWindow'>
                
                <div className="headerModal">
                    <h4>Nuevo Usuario</h4>
                    <button onClick={closeModal}> <img src={close} alt="close" /></button>
                </div>

                <form onSubmit={handlerNewUser}>
                    <input type="text" name='name' placeholder='Nombre de usuario'/>
                    <input type="mail" name="email" placeholder='Mail'/>
                    <select name="securityLevel" id="">
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                    <button className='primaryBtn'>Agregar Usuario</button>
                </form>
            </div>
            {messageError && <p className='messageError'>{messageError}</p>}
        </section>
    )
}

export default ModalNewUser