import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../componets/CustomInput'
import CustomButton from '../../componets/CustomButton'
import { ImageIcon } from '../../componets/Icons'
import { createNewAd } from '../../services/ad';


const NewAdPage = () => {
 
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [messageError, setMessageError] = useState('')
    const navigate = useNavigate();

    const handlerNewAd = (e) => {
        e.preventDefault();
        setMessageError('');
        setLoadingBtn(true);
        const newAd = Object.fromEntries(new FormData(e.target));
        createNewAd(newAd)
        .then(() => {
            setLoadingBtn(false);
            navigate('../')
        })
        .catch((e) => {
            setLoadingBtn(false);
            setMessageError(e);
        })
    }

    return (
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
            <label htmlFor="file" className='labelInputFile'>
                Cargue una imagen
                <ImageIcon />
                <input type="file" name="file" id="file" accept='image/*'/>

            </label>
            <CustomButton text='Agregar publicidad' buttonType='submit' type='primary' disabled={loadingBtn} loading={loadingBtn} />
            {messageError && <p className='messageError'>{messageError}</p>}
        </form>
    )
}

export default NewAdPage