import { React, useState } from 'react'

import usersAPI from '../../services/users';
import CustomInput from '../CustomInput'

import { CloseIcon } from '../Icons';

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
            setLoadingButton(false)
            closeModal();
        })
        .catch((e) => {
            setMessageError(e);
            setLoadingButton(false)
        }) 
    }

    return (
        <section className='modalContainer'>
            <div className='modalWindow'>
                
                <div className="headerModal">
                    <h4>Nuevo Usuario</h4>
                    <button onClick={closeModal}> <CloseIcon /> </button>
                </div>

                <form onSubmit={handlerNewUser}>

                    <CustomInput type="text" name="name" placeholder="Nombre de usuario" focus={true}/>
                    <CustomInput type="mail" name="email" placeholder="Mail" />
                    <label htmlFor="securityLevel" className='label'>Nivel de seguridad</label>
                    <select name="securityLevel" id="securityLevel">
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                    <button type='submit' className={'primaryBtn ' + (loadingButton ? 'loadingBtn' : '')} disabled={loadingButton}>Agregar Usuario</button>
                </form>
            </div>
            {messageError && <p className='messageError'>{messageError}</p>}
        </section>
    )
}

export default ModalNewUser