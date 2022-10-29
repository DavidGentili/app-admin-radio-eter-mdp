import { React, useState } from 'react'

//Components
import CustomInput from '../generalComponents/CustomInput'
import CustomButton from '../generalComponents/CustomButton'
import ModalContainer from './ModalContainer';

//Services
import { signupUser } from '../../services/users';

//Hooks
import useMessage from '../../hooks/useMessage';

const ModalNewUser = ({ closeModal, refreshUsers }) => {

    const [loadingButton, setLoadingButton] = useState(false);
    const { setMessage } = useMessage();

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
            setMessage({ message: e, type: 'error'});
            setLoadingButton(false)
        }) 
    }

    return (
        <ModalContainer title={'Nuevo usuario'} closeModal={closeModal}>
            <form onSubmit={handlerNewUser}>

            <CustomInput type="text" name="name" placeholder="Nombre de usuario" focus={true}/>
            <CustomInput type="mail" name="email" placeholder="Mail" />
            <label htmlFor="securityLevel" className='label'>Nivel de seguridad</label>
            <select name="securityLevel" id="securityLevel">
                <option value="master">Master</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
            </select>

            <CustomButton text='Agregar Usuario' type='primary' buttonType='submit' loading={loadingButton} disabled={loadingButton} />
            </form>
        </ModalContainer>
    )
}

export default ModalNewUser