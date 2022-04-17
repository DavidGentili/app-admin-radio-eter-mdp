import React from 'react'

import close from '../../../assets/close.png'

import './modalUpdateUser.css'

const ModalUpdateUser = ({ closeModal, user }) => {
  return (
    <section className='modalContainer'>
            <div className='modalWindow'>
                
                <div className="headerModal">
                    <h4>Editar Usuario</h4>
                    <button onClick={closeModal}> <img src={close} alt="close" /></button>
                </div>

                <form>
                    <input type="text" value={user.name} name='userName' placeholder='Nombre de usuario'/>
                    <input type="mail" value={user.email} name="userEmail" placeholder='Mail'/>
                    <select name="securityLevel" defaultValue={user.securityLevel} id="">
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                    <select name="state" defaultValue={user.state} id="">
                        <option value="active">Activo</option>
                        <option value="suspended">Suspendido</option>
                    </select>
                    <div className="btnPanel">
                        <button type='button' className='dangerBtn'> Eliminar Usuario </button>
                        <button type='submit' className='primaryBtn'>Actualizar Usuario</button>
                    </div>
                </form>
            </div>
        </section>
  )
}

export default ModalUpdateUser