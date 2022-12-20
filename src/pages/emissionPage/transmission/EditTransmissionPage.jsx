import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


//Components
import CustomInput from '../../../componets/generalComponents/CustomInput'
import CustomButton from '../../../componets/generalComponents/CustomButton'

//Helpers
import { getFormatTime } from '../../../helpers/format'

//Services
import { updateTransmission, deleteTransmission } from '../../../services/transmissions'

//Hooks
import useMessage from '../../../hooks/useMessage'
import useConfirmMessage from '../../../hooks/useConfirmMessage'


const EditTransmissionPage = ({ currentTransmission }) => {

    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const navigate = useNavigate();
    const setMessage = useMessage();
    const { setConfirmMessage } = useConfirmMessage();

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
            navigate('/emisiones/transmisiones')
        })
        .catch(e => {
            setMessage({ message: e, type : 'error' });
            setLoadingPrimaryBtn(false)
        })
    }

    const handlerDelete = () => {
        setLoadingDangerBtn(true);
        deleteTransmission(currentTransmission.id)
        .then(response => {
            setLoadingDangerBtn(false);
            navigate('/emisiones/transmisiones');
        })
        .catch(e => {
            setMessage({ message: e, type : 'error' });
            setLoadingDangerBtn(false)
        })
    }

    const deleteEvent = () => {
        setConfirmMessage({
            text : '¿Esta seguro que desea eliminar la transmision?',
            callback : handlerDelete
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
            
            <CustomButton onClickEvent={deleteEvent} text='Eliminar transmision' type='danger' loading={loadingDangerBtn} disabled={loadingPrimaryBtn || loadingDangerBtn} />   
        </form>
    )
}

export default EditTransmissionPage