import { React, useState } from 'react'

import close from '../../../assets/close.png'
import usersAPI from '../../services/users';

const { signupUser } = usersAPI;


const ModalNewUser = ({ closeModal, refreshUsers }) => {

    const [messageError, setMessageError] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);

    const handlerNewUser = (e) => {
        e.preventDefault();
        setLoadingButton(true);
        const {name, email, securityLevel} = Object.fromEntries(new FormData(e.target));
        signupUser({name, email, securityLevel})
        .then((data) => {
            refreshUsers();
            closeModal();
        })
        .catch((e) => {
            setMessageError(e);
        })
        .finally(() => {setLoadingButton(false)})
        
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
                    <button type='submit' className={'primaryBtn ' + (loadingButton ? 'loadingBtn' : '')}>{loadingButton ? 'Loading' : 'Agregar Usuario'}</button>
                </form>
            </div>
            {messageError && <p className='messageError'>{messageError}</p>}
        </section>
    )
}

export default ModalNewUser