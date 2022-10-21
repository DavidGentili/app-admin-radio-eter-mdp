import { React, useState } from 'react'

import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import { ImageIcon } from '../Icons';
import { postMediaFile } from '../../services/media';

const NewMediaForm = ( { refreshScreen, setMessage } ) => {
    
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [inputValue, setInputValue] = useState(false);

    const changeInputStateEvent = (e) => {
        setInputValue(e.target.value !== "" ? true : false);
    }

    const submitEvent = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        postMediaFile(Object.fromEntries(new FormData(e.target)))
        .then(res => {
            setMessage({ message: res.message, type: 'success'});
            refreshScreen();
        })
        .catch(e => {
            setMessage({ message: e.message, type: 'warning'});
        })
        .finally(() => {
            setLoadingBtn(false);
        })
    }

    return (
        <form onSubmit={submitEvent || empthyFunction}>
            <CustomInput placeholder="Nombre" name="name" type="text" />
            <label htmlFor="type">
                Tipo
                <select name='type'>
                    <option value="media">Media</option>
                    <option value="ad">Publicidad</option>
                    <option value="program">Programa</option>
                </select>
            </label>
            <label htmlFor="file" className={`labelInputFile ${inputValue && 'loaded'}`}>
                Cargue una imagen
                <ImageIcon />
                <input type="file" name="file" id="file" accept='image/*' onChange={changeInputStateEvent} />
            </label>
            <CustomButton text='Agregar archivo' buttonType='submit' type='primary' disabled={loadingBtn} loading={loadingBtn} />
        </form>
    )
}

export default NewMediaForm