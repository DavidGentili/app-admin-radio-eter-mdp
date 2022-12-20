import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//Components
import CustomInput from '../../componets/generalComponents/CustomInput';
import CustomButton from '../../componets/generalComponents/CustomButton';

//Services
import { signupUser } from '../../services/users';

//Hooks
import useMessage from '../../hooks/useMessage';

const newUserPage = ({ refreshUsers }) => {

    const [loadingButton, setLoadingButton] = useState(false);
    const { setMessage } = useMessage();
    const navigate = useNavigate();

    const handlerNewUser = (e) => {
        e.preventDefault();
        setLoadingButton(true);
        const {name, email, securityLevel} = Object.fromEntries(new FormData(e.target));
        signupUser({name, email, securityLevel})
        .then((data) => {
            refreshUsers();
            setLoadingButton(false)
            setMessage({ message: 'El usuario ha sido creado con exito', type : 'success'})
            navigate('../');
        })
        .catch((e) => {
            setMessage({ message: e, type: 'error'});
            setLoadingButton(false)
        }) 
    }

    return (
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
    )
}

export default newUserPage