import React from 'react'

//Componets
import ModalContainer from './ModalContainer'

const ModalConfirm = ({ closeModal, text, callback}) => {

    const confirmEvent = (e) => {
        e.preventDefault();
        callback();
        closeModal();
    }

    return (
        <ModalContainer title='Confirmar' extraClassName={'modalConfirm'} closeModal={closeModal}>
            <div className="confirmContainer">
                <p>{text || 'Esta seguro que quiere realizar la accion indicada'}</p>
                <button onClick={closeModal} className='cancel'>Cancelar</button>
                <button onClick={confirmEvent} className='confirm'>Aceptar</button>
            </div>
        </ModalContainer>
    )
}

export default ModalConfirm