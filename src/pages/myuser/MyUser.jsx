import { React, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

//Compontens
import CustomInput from '../../componets/generalComponents/CustomInput'
import CustomButton from '../../componets/generalComponents/CustomButton';

//Services
import { changePassword }  from '../../services/users';

//Hooks
import useUser from '../../hooks/useUser'
import useMessage from '../../hooks/useMessage';

//Styles
import './myUser.css'


const MyUser = () => {

    const [loadingButton, setLoadingButton] = useState(false);
    const localUser = useUser();
    const navigate = useNavigate();
    const setMessage = useMessage();

    const current = useRef(null);
    const updated = useRef(null);
    const confirm = useRef(null);

    const handlerChangePassword = async (e) => {
        e.preventDefault();
        setLoadingButton(true);
        try{
            const {currentPassword, newPassword, confirmPassword} = Object.fromEntries(new FormData(e.target));
            if(newPassword !== confirmPassword)
                throw 'Las contraseñas no coinciden'
            const data = await changePassword(currentPassword, newPassword);
            setMessage({ message: 'La contraseña se ha cambiado con exito', type : 'success' });
            clearInput();            
        }catch(e){
            setMessage({ message: e, type : 'error' });
        }finally{
            setLoadingButton(false);
        }
      
    }

    const handlerLogout = (e) => {
        localStorage.removeItem('userToken');
        navigate('/login');
    }

    const clearInput = () => {
        current.current.value = '';
        updated.current.value = '';
        confirm.current.value = '';
    }

    if(!localUser)
        return <h1>opps, ¡sorry! we had a server error</h1>

    return (
        <main className='myUserMain'>
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
                    <CustomInput type="password" name='currentPassword' placeholder='Contraseña actual' ref={current}/>
                    <CustomInput type="password" name='newPassword' placeholder='Nueva contraseña' ref={updated}/>
                    <CustomInput type="password" name='confirmPassword' placeholder='Confirmar contraseña' ref={confirm}/>
                    <CustomButton text='Cambiar contraseña' loading={loadingButton} buttonType='submit' type='secondary' disabled={loadingButton} />
                </form>
            </section>
            <CustomButton text='Cerrar sesion' onClickEvent={handlerLogout} type='danger' />
        </main>
    )
}

export default MyUser