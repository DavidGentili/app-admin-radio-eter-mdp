import React from 'react'

//Componets
import ModalContainer from './ModalContainer'

const ModalConfirm = ({ clearCallback, text, callback}) => {

    const confirmEvent = (e) => {
        e.preventDefault();
        callback();
        clearCallback();
    }

    return (
        <ModalContainer title='Confirmar' extraClassName={'modalConfirm'} closeModal={clearCallback}>
            <div className="confirmContainer">
                <p>{text || 'Esta seguro que quiere realizar la accion indicada'}</p>
                <button onClick={clearCallback} className='cancel'>Cancelar</button>
                <button onClick={confirmEvent} className='confirm'>Aceptar</button>
            </div>
        </ModalContainer>
    )
}

export default ModalConfirm