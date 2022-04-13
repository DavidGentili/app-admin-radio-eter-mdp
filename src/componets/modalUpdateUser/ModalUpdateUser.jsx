import React from 'react'

import './modalUpdateUser.css'

const ModalUpdateUser = ({ closeModal, }) => {
  return (
    <section className='modalContainer'>
            <div className='modalWindow'>
                
                <div className="headerModal">
                    <h4>Editar Usuario</h4>
                    <button onClick={closeModal}> <img src={close} alt="close" /></button>
                </div>

                <form>
                    <input type="text" name='userName' placeholder='Nombre de usuario'/>
                    <input type="mail" name="userEmail" placeholder='Mail'/>
                    <select name="securityLevel" id="">
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                    <select name="state" id="">
                        <option value="active">Activo</option>
                        <option value="bloqued">Bloqueado</option>
                    </select>
                    <button className='primaryBtn'>Agregar Usuario</button>
                </form>
            </div>
        </section>
  )
}

export default ModalUpdateUser