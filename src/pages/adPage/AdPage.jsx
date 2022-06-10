import {React, useState} from 'react'

import ModalNewAd from '../../componets/modals/ModalNewAd';

import './adPage.css'



const AdPage = () => {

    const [openModal, setOpenModal] = useState(false);

    const closeModal = (e) => {
        setOpenModal(false);
    }

    return (
        <>
            <main className='adPage'>
                <button className='primaryBtn' onClick={(e) => {setOpenModal(true)}}> + </button>
            </main>

            {openModal && <ModalNewAd closeModal={closeModal} />}
        </>
    )
}

export default AdPage