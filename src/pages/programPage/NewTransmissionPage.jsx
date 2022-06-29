import React from 'react'

import CustomInput from '../../componets/CustomInput'


const NewTransmissionPage = () => {
  return (
    <form >
        <CustomInput name='name' placeholder='Nombre' type='text' focus/>
        <label htmlFor='startTransmission' className='label' >Fecha y Hora de inicio 
            <input type="datetime-local" name="startTransmission" id="startTransmission" />
        </label>
        <label htmlFor='finishTransmission' className='label' >Fecha y Hora de Finalizacion 
            <input type="datetime-local" name="finishTransmission" id="finishTransmission" />
        </label>
        

    </form>
  )
}

export default NewTransmissionPage