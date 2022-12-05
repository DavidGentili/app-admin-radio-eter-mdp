import React from 'react'

import ModalContainer from './ModalContainer'
import MediaPanel from '../mediaPanel/MediaPanel';

const ModalGetMediaFile = ({ closeModal, returnFile }) => {
  return (
    <ModalContainer title='Agregar Multimedia' closeModal={closeModal}>
        <MediaPanel returnFile={returnFile}/>
    </ModalContainer>
  )
}

export default ModalGetMediaFile