import { React, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';


//Components
import CustomButton from '../../componets/generalComponents/CustomButton';
import CustomInput from '../../componets/generalComponents/CustomInput';


//Hooks
import useMessage from '../../hooks/useMessage';
import useConfirmMessage from '../../hooks/useConfirmMessage';
import useUser from '../../hooks/useUser';

//Services
import { updateUser, removeUser } from '../../services/users';
import ErrorPage from '../errorPage/ErrorPage';

//Helpers
import { getCorrectData } from '../../helpers/checkData';

const UpdateUser = ({ refreshUsers, user, }) => {

    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const navigate = useNavigate();
    const localUser = useUser();
    const setMessage = useMessage();
    const setConfirmMessage = useConfirmMessage();

    const refButton = useRef(null)
    const levelSelect = useRef(null)
    const stateSelect = useRef(null)

    const handlerUpdateUser = (e) => {
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        const {state, securityLevel} = Object.fromEntries(new FormData(e.target))
        const updateData = getCorrectData(state, securityLevel, user);
        if(updateData){
            updateUser({... updateData, idUser: user.id})
            .then((res) => {
                setLoadingPrimaryBtn(false)
                refreshUsers();
                setMessage({ message: 'El usuario ha sido actualizado con exito', type : 'success'})
                navigate('../');
            })
            .catch(e => {
                setLoadingPrimaryBtn(false);
                setMessage({ message: e, type: 'error'});
            })
        } 
    }

    const handlerRemoveUser = (e) => {
        setLoadingDangerBtn(true);
        removeUser(user.id)
        .then((res) => {
            refreshUsers();
            setMessage({ message: 'El usuario a sido eliminado con exito', type : 'success'})

            navigate('../');
        })
        .catch((e) => {
            setLoadingDangerBtn(false)
            setMessage({ message: e, type: 'error'});
        })
    }

    const handlerChange = (e) => {
        e.preventDefault()
        refButton.current.disabled = (levelSelect.current.value !== user.securityLevel || stateSelect.current.value !== user.state) ? false : true
    }

    const deleteEvent = () => {
        setConfirmMessage({
            text : '¿Esta seguro que desea eliminar el usuario?',
            callback : handlerRemoveUser,
        })
    }

    if(!user)
        return <ErrorPage />

    return (
        <form onSubmit={handlerUpdateUser} onChange={handlerChange} >
            <CustomInput focus type="text" value={user.name} name='userName' placeholder='Nombre de usuario' />
            <CustomInput type="mail" disabled value={user.email} name="userEmail" placeholder='Mail'/>
            <label htmlFor="securityLevel" className='label'>Nivel de seguridad</label>
            <select name="securityLevel" defaultValue={user.securityLevel} ref={levelSelect} id="securityLevel">
                <option value="master">Master</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
            </select>
            <label htmlFor="state" className='label'>Estado</label>
            <select name="state" defaultValue={user.state} ref={stateSelect} id="state" >
                <option value="active">Activo</option>
                <option value="suspended">Suspendido</option>
            </select>
            <div className="btnPanel">
                {localUser.id !== user.id && 
                    <CustomButton type='danger' text='Eliminar Usuario' onClickEvent={deleteEvent} loading={loadingDangerBtn} disabled={loadingDangerBtn || loadingPrimaryBtn} />
                }
                <button type='submit' className={'primaryBtn ' + (loadingPrimaryBtn ? 'loadingBtn' : '')} ref={refButton} disabled >Actualizar Usuario</button>
            </div>
        </form>
    )
}

export default UpdateUser