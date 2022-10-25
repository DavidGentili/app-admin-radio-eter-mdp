import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../componets/CustomInput'
import CustomButton from '../../componets/CustomButton'
import { ImageIcon } from '../../componets/Icons'
import { createNewAd } from '../../services/ad';
import useMessage from '../../hooks/useMessage';
import ModalGetMediaFile from '../../componets/modals/ModalGetMediaFile';


const NewAdPage = () => {
 
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [currentFile, setCurrentFile] = useState(null);
    const { setMessage } = useMessage();

    const handlerNewAd = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        const newAd = Object.fromEntries(new FormData(e.target));
        createNewAd(newAd)
        .then(() => {
            setLoadingBtn(false);
            navigate('../')
        })
        .catch((e) => {
            setLoadingBtn(false);
            setMessage({ message : e , type : 'error' });
        })
    }

    const openModalEvent = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }

    const closeModaleEvent = (e) => {
        e.preventDefault();
        setOpenModal(false);
    }

    const returnFile = (file) => {
        setCurrentFile(file);
        setOpenModal(false);
    }

    return (
        <>
            <form onSubmit={handlerNewAd} encType='multipart/form-data'>
                <CustomInput name='name' focus placeholder='Nombre' type='text' />
                <CustomInput name='link' placeholder='Link' type='text' />
                <label htmlFor="altText" className='label'>Texto Alternativo <span>opcional</span></label>
                <textarea name='altText' id='altText' placeholder='Texto Alternativo'/>
                <label htmlFor="type" className='label'>Tipo</label>
                <select name="type" id="type">
                    <option value="standard">Estandar (privada)</option>
                    <option value="oficial"> Oficial (pauta)</option>
                </select>
                <div className={`selectFile ${currentFile ? 'loaded' : ''}`} onClick={openModalEvent}> 
                    <p>Seleccionar archivo</p> 
                    <ImageIcon/> 
                </div>
                <CustomButton text='Agregar publicidad' buttonType='submit' type='primary' disabled={loadingBtn} loading={loadingBtn} />
            </form>
            <button onClick={openModalEvent}></button>
            {openModal && <ModalGetMediaFile returnFile={returnFile} closeModal={closeModaleEvent}/>}
        </>
)
}

export default NewAdPage