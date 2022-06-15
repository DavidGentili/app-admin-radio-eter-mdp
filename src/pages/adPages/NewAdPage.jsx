import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../componets/CustomInput'
import { ImageIcon } from '../../componets/Icons'
import { createNewAd } from '../../services/ad';


const NewAdPage = ({refreshPanel}) => {
 
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [messageError, setMessageError] = useState('')
    const navigate = useNavigate();

    const handlerNewAd = (e) => {
        e.preventDefault();
        setMessageError('');
        setLoadingBtn(true);
        const form = Object.fromEntries(new FormData(e.target));
        createNewAd(form)
        .then(() => {
            setLoadingBtn(false);
            refreshPanel().then(() => {
                navigate('../')
            })
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
            <button type='submit' className={'primaryBtn ' + (loadingBtn ? 'loadingBtn' : '')} disabled={loadingBtn} >Agregar publicidad</button>
            {messageError && <p className='messageError'>{messageError}</p>}
        </form>
    )
}

export default NewAdPage