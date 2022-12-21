import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//Components
import CustomInput from '../../componets/generalComponents/CustomInput'
import CustomButton from '../../componets/generalComponents/CustomButton'
import ModalGetMediaFile from '../../componets/modals/ModalGetMediaFile';
import SelectFile from '../../componets/generalComponents/SelectFile';

//Services
import { createNewAd } from '../../services/ad';

//Hooks
import useMessage from '../../hooks/useMessage';
import useSelectMedia from '../../hooks/useSelectMedia';


const NewAdPage = () => {
 
    const [loadingBtn, setLoadingBtn] = useState(false);
    const navigate = useNavigate();
    const [currentFile, setCurrentFile] = useState(null);
    const setMessage = useMessage();
    const selectMedia = useSelectMedia();

    const handlerNewAd = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        const newAd = {...Object.fromEntries(new FormData(e.target)), file: currentFile};
        createNewAd(newAd)
        .then(({data}) => {
            setLoadingBtn(false);
            setMessage({ message: data.message, type : 'success' })
            navigate('../')
        })
        .catch((e) => {
            setLoadingBtn(false);
            setMessage({ message : e , type : 'error' });
        })
    }

    const returnFile = (file) => {
        setCurrentFile(file);
    }

    const openModalEvent = (e) => {
        selectMedia({ callback : returnFile })
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
                <SelectFile currentFile={currentFile} openModal={openModalEvent} />
                <CustomButton text='Agregar publicidad' buttonType='submit' type='primary' disabled={loadingBtn} loading={loadingBtn} />
            </form>
        </>
)
}

export default NewAdPage