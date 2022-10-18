import { React, useState } from 'react'

import CustomButton from '../../componets/CustomButton';
import CustomInput from '../../componets/CustomInput';
import { ImageIcon } from '../../componets/Icons';

const NewMediaForm = () => {
    
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [inputValue, setInputValue] = useState(false);


    const submitEvent = (e) => {
        e.preventDefault();
    } 


    const changeInputStateEvent = (e) => {
        setInputValue(e.target.value !== "" ? true : false);
    }

    return (
        <form onSubmit={submitEvent}>
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