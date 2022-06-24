import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser'

import userAPI from '../../services/users';
import CustomInput from '../../componets/CustomInput'

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

    if(!localUser)
        return <h1>opps, ¡sorry! we had a server error</h1>

    return (
        <main className='myUserMain'>
            {successMessage && <p className='messageSuccess'>{successMessage}</p>}
            <section className='myUserInformation'>
                <h3>Datos</h3>
                <h4>Usuario: <span>{localUser.name}</span></h4>
                <h4>Mail: <span>{localUser.email}</span></h4>
                <h4>Nivel: <span>{localUser.securityLevel}</span></h4>
                <h4>Estado: <span>{localUser.state}</span></h4>
            </section>

            <section className='myUserForm'>
                <h3>Cambiar contraseña</h3>
                <form onSubmit={handlerChangePassword}>
                    <CustomInput type="password" name='currentPassword' placeholder='Contraseña actual'/>
                    <CustomInput type="password" name='newPassword' placeholder='Nueva contraseña'/>
                    <CustomInput type="password" name='confirmPassword' placeholder='Confirmar contraseña'/>
                    <button type='submit' className={'secondaryBtn' + (loadingButton ? ' loading' : '')}>Cambiar contraseña</button>
                </form>
                {messageError && <p className='messageError'>{messageError}</p>}
            </section>
            <button className='dangerBtn' onClick={handlerLogout} >Cerrar sesion</button>
        </main>
    )
}

export default MyUser