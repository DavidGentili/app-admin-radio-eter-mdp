import React from 'react'

import ModalContainer from './ModalContainer'
import MediaPanel from '../mediaPanel/MediaPanel';

const ModalGetMediaFile = ({ closeModal, callback }) => {

    const callbackEvent = (file) => {
        callback(file);
        closeModal();
    }

    return (
        <ModalContainer title='Agregar Multimedia' closeModal={closeModal}>
            <MediaPanel returnFile={callbackEvent}/>
        </ModalContainer>
    )
}

export default ModalGetMediaFile