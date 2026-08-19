import React, { useState } from 'react'

//Components
import SelectFile from '../../../componets/generalComponents/SelectFile';
import CustomInput from '../../../componets/generalComponents/CustomInput';
import CustomButton from '../../../componets/generalComponents/CustomButton';

//Hooks
import useSelectMedia from '../../../hooks/useSelectMedia';
import useMessage from '../../../hooks/useMessage';

//Services
import { addContent } from '../../../services/content';

export default function AddContent({ platformId, refreshContent }) {

    const [currentFile, setCurrentFile] = useState(null);
    const selectMedia = useSelectMedia();
    const setMessage = useMessage();

    function handleSubmit(e) {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));

        addContent(platformId, {
            title: form.title,
            src: currentFile.url,
            link: form.link,
            popup: form.popup === 'true',
        })
        .then(({ data }) => {
            setMessage({ message : data?.message, type : 'success' });
        })
        .catch(e => {
            setMessage({ message : e, type : 'error' });
        })
        .finally(() => {
            refreshContent();
        })
    }

    const returnFile = (file) => {
        setCurrentFile(file);
    }

    const openModalEvent = (e) => {
        selectMedia({ callback : returnFile })
    }

    return (
        <form onSubmit={handleSubmit} className='addContentForm'>
            <CustomInput name='title' placeholder='Nombre' />
            <CustomInput name='link' placeholder='Link' />
            <label htmlFor='popup' className='popupSelect'>
                Apertura
                <select name='popup' id='popup' defaultValue='false'>
                    <option value='false'>pestaña</option>
                    <option value='true'>ventana</option>
                </select>
            </label>
            <SelectFile currentFile={currentFile} openModal={openModalEvent} />
            <CustomButton text='Agregar contenido' buttonType='submit' type='primary' />
        </form>
    )
}
