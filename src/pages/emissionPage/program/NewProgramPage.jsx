import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//Components
import CustomInput from '../../../componets/generalComponents/CustomInput';
import SelectFile from '../../../componets/generalComponents/SelectFile';
import CustomButton from '../../../componets/generalComponents/CustomButton';

//Helpers
import { daysValues } from '../../../helpers/daysValue';

//Services
import { createNewProgram } from '../../../services/programs';

//Hooks
import useMessage from '../../../hooks/useMessage';
import useSelectMedia from '../../../hooks/useSelectMedia';

const NewProgramPage = () => {

    const [loadingButton, setloadingButton] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);
    const navigate = useNavigate();
    const selectMedia = useSelectMedia();
    const setMessage = useMessage();


    const submitHandler = (e) => {
        e.preventDefault();
        setloadingButton(true);
        const form = Object.fromEntries(new FormData(e.target));
        createNewProgram({...form, file : currentFile})
        .then(({data}) => {
            setMessage({ message : data.message, type: 'success'});
            setloadingButton(false);
            navigate('../')
        })
        .catch(e => {
            setloadingButton(false);
            setMessage({ message: e, type : 'error' });
        })
    }

    const returnFile = (file) => {
        setCurrentFile(file);
    }

    const openModalEvent = (e) => {
        selectMedia({ callback : returnFile });
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
            
            <label htmlFor='highlighted' className='label' >Destacado <input type="checkbox" name="highlighted" id="highlighted" /> </label>
            
            <SelectFile openModal={openModalEvent} currentFile={currentFile} />       

            <CustomButton buttonType='submit' type='primary' loadingButton={loadingButton} disabled={loadingButton} >Crear programa</CustomButton>

        </form>
    )
}

export default NewProgramPage