import React from 'react'

import ModalContainer from './ModalContainer'
import MediaPanel from '../mediaPanel/MediaPanel';

const ModalGetMediaFile = ({ closeModal, callback }) => {
  return (
    <ModalContainer title='Agregar Multimedia' closeModal={closeModal}>
        <MediaPanel returnFile={callback}/>
    </ModalContainer>
  )
}

export default ModalGetMediaFile