import { React, useState, useRef } from 'react'

import useUser from '../../hooks/useUser';

import close from '../../../assets/close.png'

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
    const [loadingButton, setLoadingButton] = useState(false);
    const localUser = useUser();

    const refButton = useRef(null)
    const levelSelect = useRef(null)
    const stateSelect = useRef(null)

    const handlerUpdateUser = (e) => {
        e.preventDefault();
        setMessageError('');
        setLoadingButton(true);
        const {state, securityLevel} = Object.fromEntries(new FormData(e.target))
        const updateData = getCorrectData(state, securityLevel, user);
        if(updateData){
            updateUser({... updateData, idUser: user.id})
            .then((res) => {
                closeModal();
                refreshUsers();
            })
            .catch(e => {
                setMessageError(e);
            })
            .finally(() => {setLoadingButton(false)})
        } 
    }

    const handlerRemoveUser = (e) => {
        e.preventDefault();
        setMessageError('');
        setLoadingButton(true);
        removeUser(user.id)
        .then((res) => {
            closeModal();
            refreshUsers();
        })
        .catch((e) => {
            setMessageError(e);
        })
        .finally(() => {setLoadingButton(false)})
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
                        <input type="text" disabled value={user.name} name='userName' placeholder='Nombre de usuario'/>
                        <input type="mail" disabled value={user.email} name="userEmail" placeholder='Mail'/>
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
                            <button type='button' className={'dangerBtn ' + (loadingButton ? 'loadingBtn' : '') } disabled={loadingButton} onClick={handlerRemoveUser}> {loadingButton ? 'Loading' : 'Eliminar Usuario'} </button>}
                            <button type='submit' className={'primaryBtn ' + (loadingButton ? 'loadingBtn' : '')} ref={refButton} disabled >{loadingButton ? 'Loading' : 'Actualizar Usuario'}</button>
                        </div>
                    </form>
                </div>
                {messageError && <p className='messageError'>{messageError}</p>}
            </section>
    )
}

export default ModalUpdateUser