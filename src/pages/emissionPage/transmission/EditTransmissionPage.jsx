import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomInput from '../../../componets/CustomInput'
import CustomButton from '../../../componets/CustomButton'

import { getFormatTime } from '../../../helpers/format'
import { updateTransmission, deleteTransmission } from '../../../services/transmissions'


const EditTransmissionPage = ({ currentTransmission }) => {

    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const [messageError, setMessageError] = useState('');
    const navigate = useNavigate();

    if(!currentTransmission)
        return <></>

    const { name, active } = currentTransmission
    const startTransmission = getFormatTime(currentTransmission.startTransmission);
    const finishTransmission = getFormatTime(currentTransmission.finishTransmission);


    const handlerSubmit = (e) =>{
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        const form = Object.fromEntries(new FormData(e.target))
        updateTransmission(form, currentTransmission)
        .then(response => {
            setLoadingPrimaryBtn(false)
            navigate('/programas/transmisiones')
        })
        .catch(e => {
            setMessageError(e)
            setLoadingPrimaryBtn(false)
        })
    }

    const handlerDelete = (e) => {
        e.preventDefault();
        setLoadingDangerBtn(true);
        deleteTransmission(currentTransmission.id)
        .then(response => {
            setLoadingDangerBtn(false);
            navigate('/programas/transmisiones');
        })
        .catch(e => {
            setMessageError(e)
            setLoadingDangerBtn(false)
        })
    }

    return (
        <form onSubmit={handlerSubmit}>
            <CustomInput name='name' placeholder='Nombre' value={name} />
            <div className="hours">
                <label htmlFor='startTransmission' className='label' >Fecha y Hora de inicio 
                    <input type="datetime-local" name="startTransmission" id="startTransmission" defaultValue={startTransmission} />
                </label>
                <label htmlFor='finishTransmission' className='label' >Fecha y Hora de Finalizacion 
                    <input type="datetime-local" name="finishTransmission" id="finishTransmission" defaultValue={finishTransmission}/>
                </label>
            </div>

            <label htmlFor='active' className='label' >Activo <input type="checkbox" name="active" id="active" defaultChecked={active} /> </label>

            <CustomButton text='Actualizar transmision' type='primary'  buttonType='submit' loading={loadingPrimaryBtn} disabled={loadingPrimaryBtn || loadingDangerBtn} />   
            
            <CustomButton onClickEvent={handlerDelete} text='Eliminar transmision' type='danger' loading={loadingDangerBtn} disabled={loadingPrimaryBtn || loadingDangerBtn} />   

            {messageError && <p className='messageError'>{messageError}</p>}
        </form>
    )
}

export default EditTransmissionPage