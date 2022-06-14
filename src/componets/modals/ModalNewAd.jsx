import { React, useState } from 'react'

import { CloseIcon } from '../Icons'
import CustomInput from '../CustomInput';
import { ImageIcon } from '../Icons';
import { createNewAd } from '../../services/ad';

const ModalNewAd = ({closeModal}) => {

    const [loadingBtn, setLoadingBtn] = useState(false);
    const [messageError, setMessageError] = useState('');

    const handlerNewAd = (e) => {
        e.preventDefault();
        setMessageError('');
        setLoadingBtn(true);
        const form = Object.fromEntries(new FormData(e.target));
        createNewAd(form)
        .then((res) => {
            setLoadingBtn(false);
            closeModal();
        })
        .catch((e) => {
            setLoadingBtn(false);
            setMessageError(e);
        })
    }

    return (
        <section className='modalContainer'>
                <div className='modalWindow'>
                    
                    <div className="headerModal">
                        <h4>Agregar publicidad</h4>
                        <button onClick={closeModal}> <CloseIcon /> </button>
                    </div>

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
                        <label htmlFor="file" className='label labelInputFile'>
                            Cargue una imagen
                            <ImageIcon />
                            <input type="file" name="file" id="file" accept='image/*'/>

                        </label>
                        <button type='submit' className={'primaryBtn ' + (loadingBtn ? 'loadingBtn' : '')} disabled={loadingBtn} >Agregar publicidad</button>
                    </form>
                    {messageError && <p className='messageError'>{messageError}</p>}

                </div>
            </section>
    )
}

export default ModalNewAd