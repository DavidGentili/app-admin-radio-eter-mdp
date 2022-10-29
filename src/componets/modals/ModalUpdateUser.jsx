import { React, useState, useRef } from 'react'

//Components
import CustomInput from '../generalComponents/CustomInput'
import CustomButton from '../generalComponents/CustomButton';
import ModalContainer from './ModalContainer';

//Hooks
import useUser from '../../hooks/useUser';
import useMessage from '../../hooks/useMessage';

//Services
import { updateUser, removeUser } from '../../services/users';
import useConfirmMessage from '../../hooks/useConfirmMessage';

const getCorrectData = (state, securityLevel, user) => {
    const updateData = {};
    if(state !== user.state)
            updateData['state'] = state;
    if(securityLevel !== user.securityLevel)
        updateData['securityLevel'] = securityLevel;
    return (Object.keys(updateData).length) ? updateData : null
}

const ModalUpdateUser = ({ closeModal, user, refreshUsers }) => {

    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const localUser = useUser();
    const { setMessage } = useMessage();
    const { setConfirmMessage } = useConfirmMessage();

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
                closeModal();
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
        .then((res) => {3
            refreshUsers();
            closeModal();
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

    return (
        <ModalContainer title='Editar usuario' closeModal={closeModal}>
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
        </ModalContainer>
    )
}

export default ModalUpdateUser