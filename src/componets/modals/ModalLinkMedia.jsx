import React from 'react'


//Components
import ModalContainer from './ModalContainer'
import CustomButton from '../generalComponents/CustomButton'
import CustomInput from '../generalComponents/CustomInput'

const ModalLinkMedia = ({ closeModal, callback, type}) => {

    const clickEvent = (e) => {
        e.preventDefault();
        const { url, alt } = Object.fromEntries(new FormData(e.target))
        callback({ url, alt })
        closeModal();
    }

    return (
        <ModalContainer title='Agregar Contenido Multimedia' closeModal={closeModal} >
            <form onSubmit={clickEvent}>
                <CustomInput name='url' placeholder='Link' focus/>
                <CustomInput name='alt' placeholder='Agregar texto (opcional)' />
                <CustomButton text='Agregar' type='primary' buttonType='submit' />
            </form>
            
        </ModalContainer>
    )
}

export default ModalLinkMedia