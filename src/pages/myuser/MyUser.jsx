import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser'

import userAPI from '../../services/users';
const { changePassword } = userAPI;

import './myUser.css'

const MyUser = () => {

    const [loadingButton, setLoadingButton] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const localUser = useUser();
    const navigate = useNavigate();

    const handlerChangePassword = async (e) => {
        e.preventDefault();
        setLoadingButton(true);
        setMessageError('');
        try{
            const {currentPassword, newPassword, confirmPassword} = Object.fromEntries(new FormData(e.target));
            if(newPassword !== confirmPassword)
                throw 'Las contraseñas no coinciden'
            const data = await changePassword(currentPassword, newPassword);
            setSuccessMessage('La contraseña se ha cambiado con exito')
            
        }catch(e){
            setMessageError(e);
        }finally{
            setLoadingButton(false);
        }
      
    }

    const handlerLogout = (e) => {
        localStorage.removeItem('userToken');
        navigate('/login');
    }

    return (
        <main className='myUserMain'>
            { localUser ?
                <>
                    {successMessage && <p className='messageSuccess'>{successMessage}</p>}
                    <section className='myUserInformation'>
                        <h3>Datos</h3>
                        <h4>Usuario: <span>{localUser.name}</span></h4>
                        <h5>Nivel: <span>{localUser.securityLevel}</span></h5>
                        <h4>Mail: <span>{localUser.email}</span></h4>
                        <h5>Estado: <span>{localUser.state}</span></h5>
                    </section>

                    <section className='myUserForm'>
                        <h3>Cambiar Contraseña</h3>
                        <form onSubmit={handlerChangePassword}>
                            <input type="password" name='currentPassword' placeholder='Contraseña actual'/>
                            <input type="password" name='newPassword' placeholder='Nueva contraseña'/>
                            <input type="password" name='confirmPassword' placeholder='Confirmar contraseña'/>
                            <button type='submit' className={'textBtn' + (loadingButton ? ' loading' : '')}>Cambiar contraseña</button>
                        </form>
                        {messageError && <p className='messageError'>{messageError}</p>}
                    </section>
                    <button className='textBtn' onClick={handlerLogout} >Cerrar sesion</button>
                </>
                :
                <h1>opps, ¡sorry! we had a server error</h1>
            }
        </main>
    )
}

export default MyUser