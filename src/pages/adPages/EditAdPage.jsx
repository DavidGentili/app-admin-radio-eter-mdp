import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../componets/CustomInput';
import CustomButton from '../../componets/CustomButton'

import { deleteAd, updateAd } from '../../services/ad';
import useMessage from '../../hooks/useMessage';

const EditAdPage = ( { currentAd } ) => {
    
    const navigate = useNavigate();
    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const { urlImage, altText, name, link, type} = currentAd ? currentAd : {};
    const { setMessage } = useMessage();
    
    useEffect(() => {
        if(!currentAd)
            navigate('../');
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        const newAd = Object.fromEntries(new FormData(e.target));
        updateAd(newAd, currentAd)
        .then(() => {
            setLoadingPrimaryBtn(false);
            navigate('../')
        })
        .catch(e => {
            setLoadingPrimaryBtn(false);
            setMessage({ message : e , type : 'error' });
        })
    }

    const removeHandler = (e) => {
        e.preventDefault();
        setLoadingDangerBtn(true);
        deleteAd(currentAd.id)
        .then(() => {
            setLoadingDangerBtn(false);
            refreshPanel().then(() => navigate('../'))
        })
        .catch(e => {
            setLoadingDangerBtn(false);
            setMessage({ message : e , type : 'error' });
        })
    }

    if(!currentAd)
    return <></>


    return (
        <div className="currentAd">
            <img src={ urlImage ? urlImage : ''} alt={ altText ? altText : '' } />
            <form onSubmit={handlerSubmit}>
                <CustomInput focus name='name' value={name} placeholder='Nombre' />
                <CustomInput name='link' value={link} placeholder='Link' />
                <label htmlFor="altText" className='label'>Texto Alternativo <span>opcional</span></label>
                <textarea name='altText' id='altText' placeholder='Texto Alternativo'/>
                <label htmlFor="type" className='label'>Tipo</label>
                <select name="type" id="type" defaultValue={type}>
                    <option value="standard">Estandar (privada)</option>
                    <option value="oficial"> Oficial (pauta)</option>
                </select>
                <CustomButton text='Actualizar publicidad' buttonType='submit' type='primary' loading={loadingPrimaryBtn} disabled={loadingDangerBtn || loadingPrimaryBtn}/>
            </form>
            <CustomButton text='Eliminar publicidad' type='danger' loading={loadingDangerBtn} disabled={loadingDangerBtn || loadingPrimaryBtn} onClickEvent={removeHandler} />
        </div>
    )
}

export default EditAdPage