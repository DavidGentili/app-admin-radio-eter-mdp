import { React, useState } from 'react';

const useModal = (initialState) => {

    const [openModal, setOpenModal] = useState(initialState);

    const openModalEvent = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }
    
    const closeModaleEvent = (e) => {
        e.preventDefault();
        setOpenModal(false);
    }

    return {openModal, openModalEvent, closeModaleEvent};
}


export default useModal;
