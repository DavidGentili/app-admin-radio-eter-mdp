import React from 'react'
import ModalConfirm from './ModalConfirm'
import ModalGetMediaFile from './ModalGetMediaFile'
import ModalLinkMedia from './ModalLinkMedia'




const Modal = ( { data, type, callback, closeModal } ) => {


    if(type == 'confirm') return <ModalConfirm {...{ text : data.text, callback, closeModal}}  />
    if(type == 'selectMedia') return <ModalGetMediaFile {...{ closeModal, callback}} />
    if(type == 'linkMedia') return <ModalLinkMedia {...{ closeModal, callback}} />
    return <></>
}

export default Modal