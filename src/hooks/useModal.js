import { React, useState } from 'react';

const useModal = (initialState = false) => {

    const [openModal, setOpenModal] = useState(initialState);

    const openModalEvent = (e) => {
        if(e && e.preventDefault)
            e.preventDefault();
        setOpenModal(true);
    }
    
    const closeModalEvent = (e) => {
        if(e && e.preventDefault)
            e.preventDefault();
        setOpenModal(false);
    }

    return {openModal, openModalEvent, closeModalEvent};
}


export default useModal;
