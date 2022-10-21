import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../../componets/CustomInput';
import { ImageIcon } from '../../../componets/Icons';
import { createNewProgram } from '../../../services/programs';
import { daysValues } from '../../../helpers/daysValue';
import useMessage from '../../../hooks/useMessage';

const NewProgramPage = () => {

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [loadingButton, setloadingButton] = useState(false);
    const navigate = useNavigate();
    const { setMessage } = useMessage();

    const submitHandler = (e) => {
        e.preventDefault();
        setloadingButton(true);
        const form = Object.fromEntries(new FormData(e.target));
        createNewProgram(form)
        .then(response => {
            setloadingButton(false);
            navigate('../')
        })
        .catch(e => {
            setloadingButton(false);
            setMessage({ message: e, type : 'error' });
        })
    }

    return (

        <form onSubmit={submitHandler} >
            <CustomInput name='name' placeholder='Nombre' focus type='text' />
            <label htmlFor="" className='label'>Dias</label>
            <div className="days">
                {daysValues.map(({ value, text }) => <label key={value} htmlFor={value} className='label' >{text} <input type="checkbox" name={value} id={value} /> </label>)}
            </div>
            <div className="hours">
                <label htmlFor="" className='label'>Hora de inicio</label>
                <input type="time" name="startHour" />
                <label htmlFor="" className='label'>Hora de finalizacion</label>
                <input type="time" name="finishHour" />
            </div>
            
            <label htmlFor='highlighted' className='label' >Destacado <input onChange={(e) => {setIsHighlighted(e.target.checked)}} type="checkbox" name="highlighted" id="highlighted" /> </label>
            <label htmlFor="file" className={'labelInputFile' + (!isHighlighted ? ' hidden' : '')} >
                Cargue una imagen
                <ImageIcon />
                <input type="file" name="file" id="file" accept='image/*'/>
            </label>        

            <button type='submit' className={`primaryBtn${loadingButton ? ' loadingBtn' : ''}`} disabled={loadingButton} >Crear programa</button>
            
        </form>
    )
}

export default NewProgramPage