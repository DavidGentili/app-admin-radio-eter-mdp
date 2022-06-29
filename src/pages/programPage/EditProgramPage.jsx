import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../componets/CustomInput';
import { ImageIcon } from '../../componets/Icons'
import { daysValues } from '../../helpers/daysValue';
import CustomButton from '../../componets/CustomButton';
import { deleteProgram, updateProgram } from '../../services/programs';


function EditProgramPage({ currentProgram }) {
    if(!currentProgram)
        return <></>

    const { name, days, startHour, finishHour, highlighted , urlImage} = currentProgram;
    const [isHighlighted, setIsHighlighted] = useState(highlighted);
    const [ loadingPrimaryBtn, setLoadingPrimaryBtn ] = useState(false);
    const [ loadingDangerBtn, setLoadingDangerBtn ] = useState(false)
    const [ messageError, setMessageError ] = useState('');
    const navigate = useNavigate();

    const updateHandler = (e) => {
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        setMessageError('');
        const form = Object.fromEntries(new FormData(e.target));
        updateProgram(form, currentProgram)
        .then(response => {
            navigate('../');
        })
        .catch(e => {
            setLoadingPrimaryBtn(false);
            setMessageError(e);
        })
    }

    const deleteHandler = (e) => {
        setLoadingDangerBtn(true);
        setMessageError('');
        deleteProgram(currentProgram.id)
        .then(response => {
            navigate('../');
        })
        .catch(e => {
            setLoadingDangerBtn(false);
            setMessageError(e);
        })
    }

    
    return (
        <div className='currentProgram'>
            <div className="imageContainer">
                {urlImage ? <img src={urlImage} alt={name} /> : <p>El programa no tiene una imagen</p>}
            </div>
            <form onSubmit={updateHandler}>
                <CustomInput name='name' value={name} focus placeholder='Nombre'  />
                <label htmlFor="" className='label'>Dias</label>
                <div className="days">
                    {daysValues.map(function({ value, text}, i) { return <label key={value} htmlFor={value} className='label' >{text} <input type="checkbox" name={value} defaultChecked={days[i]} id={value} /> </label> })}
                </div>
                <div className="hours">
                    <label htmlFor="" className='label'>Hora de inicio</label>
                    <input type="time" defaultValue={startHour} name="startHour" />
                    <label htmlFor="" className='label'>Hora de finalizacion</label>
                    <input type="time" defaultValue={finishHour} name="finishHour" />
                </div>
                
                <label htmlFor='highlighted' className='label' >Destacado <input onChange={(e) => {setIsHighlighted(e.target.checked)}} defaultChecked={highlighted} type="checkbox" name="highlighted" id="highlighted" /> </label>
                <label htmlFor="file" className={'labelInputFile' + (!isHighlighted ? ' hidden' : '')}  >
                    Cargue una imagen
                    <ImageIcon />
                    <input type="file" name="file" id="file" accept='image/*'/>
                </label>  

                <CustomButton type='primary' buttonType='submit' disabled={loadingDangerBtn || loadingPrimaryBtn} loading={loadingPrimaryBtn} text='Actualizar programa' />

            </form>
            <CustomButton onClickEvent={deleteHandler} text='Eliminar programa' type='danger' loading={loadingDangerBtn} disabled={loadingPrimaryBtn || loadingDangerBtn} />
            {messageError && <p className='messageError'>{messageError}</p>}

        </div>
     )
}

export default EditProgramPage