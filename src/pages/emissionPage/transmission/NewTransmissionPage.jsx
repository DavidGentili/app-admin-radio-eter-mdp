import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//Components
import CustomInput from '../../../componets/generalComponents/CustomInput'
import CustomButton from '../../../componets/generalComponents/CustomButton'

//Services
import { createTransmission } from '../../../services/transmissions'

//Hooks
import useMessage from '../../../hooks/useMessage'


const NewTransmissionPage = () => {

    const [ loadingButton, setLoadingButton] = useState(false);
    const [messageError, setMessageError] = useState('');
    const navigate = useNavigate();
    const { setMessage } = useMessage();

    
    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoadingButton(true);
        const form = Object.fromEntries(new FormData(e.target));
        createTransmission(form)
        .then((response) => {
            setLoadingButton(false);
            navigate('/emisiones/transmisiones');
        })
        .catch(e => {
            setMessage({ message: e, type : 'error' });
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

            <CustomButton text='Agregar transmision' type='primary' buttonType='submit' loading={loadingButton} disabled={loadingButton} />            

        </form>
  )
}

export default NewTransmissionPage