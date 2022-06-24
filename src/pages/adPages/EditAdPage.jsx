import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../componets/CustomInput';

import { deleteAd, updateAd } from '../../services/ad';

const EditAdPage = ( { currentAd, refreshPanel } ) => {
    


    const navigate = useNavigate();
    const [messageError, setMessageError] = useState('');
    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const { urlImage, altText, name, link, type} = currentAd ? currentAd : {};
    
    useEffect(() => {
        if(!currentAd)
            navigate('../');
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        setMessageError('')
        const newAd = Object.fromEntries(new FormData(e.target));
        updateAd(newAd, currentAd)
        .then(() => {
            setLoadingPrimaryBtn(false);
            refreshPanel().then(() => { navigate('../')});
        })
        .catch(e => {
            setLoadingPrimaryBtn(false);
            setMessageError(e);
        })
    }

    const removeHandler = (e) => {
        e.preventDefault();
        setMessageError('');
        setLoadingDangerBtn(true);
        deleteAd(currentAd.id)
        .then(() => {
            setLoadingDangerBtn(false);
            refreshPanel().then(() => navigate('../'))
        })
        .catch(e => {
            setLoadingDangerBtn(false);
            setMessageError(e);
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
                <button type='submit' className={'primaryBtn ' + (loadingPrimaryBtn ? 'loadingBtn' : '')} disabled={loadingPrimaryBtn || loadingDangerBtn} >Actulizar publicidad</button>
            </form>
            <button onClick={removeHandler} className={'dangerBtn ' + (loadingDangerBtn ? 'loadingBtn' : '')} disabled={loadingPrimaryBtn || loadingDangerBtn}>Eliminar publicidad</button>
            {messageError && <p className='messageError'>{messageError}</p>}
        </div>
    )
}

export default EditAdPage