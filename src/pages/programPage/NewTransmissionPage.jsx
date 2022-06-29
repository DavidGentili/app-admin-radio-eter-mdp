import React, { useState } from 'react'

import CustomInput from '../../componets/CustomInput'
import CustomButton from '../../componets/CustomButton'

import { createTransmission } from '../../services/transmissions'


const NewTransmissionPage = () => {

    const [ loadingButton, setLoadingButton] = useState(false);
    const [messageError, setMessageError] = useState('');

    
    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoadingButton(true);
        setMessageError('')
        const form = Object.fromEntries(new FormData(e.target));
        createTransmission(form)
        .then((response) => {
            console.log(response);
            setLoadingButton(false);
        })
        .catch(e => {
            setMessageError(e);
            setLoadingButton(false);
        })
    }

    return (
        <form onSubmit={handlerSubmit}>
            <CustomInput name='name' placeholder='Nombre' type='text' focus/>
            <div className="hours">
                <label htmlFor='startTransmission' className='label' >Fecha y Hora de inicio 
                    <input type="datetime-local" name="startTransmission" id="startTransmission" />
                </label>
                <label htmlFor='finishTransmission' className='label' >Fecha y Hora de Finalizacion 
                    <input type="datetime-local" name="finishTransmission" id="finishTransmission" />
                </label>
            </div>

            <CustomButton text='Agregar transmision' type='primary' typeButton='submit' loading={loadingButton} disabled={loadingButton} />            

            {messageError && <p className='messageError'>{messageError}</p>}

        </form>
  )
}

export default NewTransmissionPage