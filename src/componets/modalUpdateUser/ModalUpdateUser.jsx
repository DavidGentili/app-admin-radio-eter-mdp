import { React, useState, useRef } from 'react'

import useUser from '../../hooks/useUser';

import close from '../../../assets/close.png'
import CustomInput from '../CustomInput'

import usersAPI from '../../services/users';
const { updateUser, removeUser } = usersAPI;

const getCorrectData = (state, securityLevel, user) => {
    const updateData = {};
    if(state !== user.state)
            updateData['state'] = state;
    if(securityLevel !== user.securityLevel)
        updateData['securityLevel'] = securityLevel;
    return (Object.keys(updateData).length) ? updateData : null
}

const ModalUpdateUser = ({ closeModal, user, refreshUsers }) => {

    const [messageError, setMessageError] = useState('');
    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const localUser = useUser();

    const refButton = useRef(null)
    const levelSelect = useRef(null)
    const stateSelect = useRef(null)

    const handlerUpdateUser = (e) => {
        e.preventDefault();
        setMessageError('');
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
                setMessageError(e);
            })
        } 
    }

    const handlerRemoveUser = (e) => {
        e.preventDefault();
        setMessageError('');
        setLoadingDangerBtn(true);
        removeUser(user.id)
        .then((res) => {3
            refreshUsers();
            closeModal();
        })
        .catch((e) => {
            setLoadingDangerBtn(false)
            setMessageError(e);
        })
    }

    const handlerChange = (e) => {
        e.preventDefault()
        refButton.current.disabled = (levelSelect.current.value !== user.securityLevel || stateSelect.current.value !== user.state) ? false : true
    }

    return (
        <section className='modalContainer'>
                <div className='modalWindow'>
                    
                    <div className="headerModal">
                        <h4>Editar Usuario</h4>
                        <button onClick={closeModal}> <img src={close} alt="close" /></button>
                    </div>

                    <form onSubmit={handlerUpdateUser} onChange={handlerChange} >
                        <CustomInput type="text" value={user.name} name='userName' placeholder='Nombre de usuario' />
                        <CustomInput type="mail" disabled value={user.email} name="userEmail" placeholder='Mail'/>
                        <select name="securityLevel" defaultValue={user.securityLevel} ref={levelSelect} >
                            <option value="master">Master</option>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                        </select>
                        <select name="state" defaultValue={user.state} ref={stateSelect} >
                            <option value="active">Activo</option>
                            <option value="suspended">Suspendido</option>
                        </select>
                        <div className="btnPanel">
                            {localUser.id !== user.id && 
                                <button type='button' className={'dangerBtn ' + (loadingDangerBtn ? 'loadingBtn' : '') } disabled={loadingDangerBtn} onClick={handlerRemoveUser}> Eliminar Usuario </button>
                            }
                            <button type='submit' className={'primaryBtn ' + (loadingPrimaryBtn ? 'loadingBtn' : '')} ref={refButton} disabled >{loadingPrimaryBtn ? 'Loading' : 'Actualizar Usuario'}</button>
                        </div>
                    </form>
                </div>
                {messageError && <p className='messageError'>{messageError}</p>}
            </section>
    )
}

export default ModalUpdateUser