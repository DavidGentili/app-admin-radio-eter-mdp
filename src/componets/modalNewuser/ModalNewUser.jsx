import React from 'react'

import close from '../../../assets/close.png'

import './modalNewUser.css'

const ModalNewUser = ({ closeModal }) => {
    return (
        <section className='modalContainer'>
            <div className='modalWindow'>
                
                <div className="headerModal">
                    <h4>Nuevo Usuario</h4>
                    <button onClick={closeModal}> <img src={close} alt="close" /></button>
                </div>

                <form>
                    <input type="text" name='userName' placeholder='Nombre de usuario'/>
                    <input type="mail" name="userEmail" placeholder='Mail'/>
                    <select name="" id="">
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                    <button className='primaryBtn'>Agregar Usuario</button>
                </form>
            </div>
        </section>
    )
}

export default ModalNewUser