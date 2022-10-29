import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//Components
import CustomInput from '../../../componets/CustomInput';
import { daysValues } from '../../../helpers/daysValue';
import CustomButton from '../../../componets/CustomButton';

//Services
import { deleteProgram, updateProgram } from '../../../services/programs';

//Hooks
import useMessage from '../../../hooks/useMessage';
import useModal from '../../../hooks/useModal';
import SelectFile from '../../../componets/SelectFile';
import ModalGetMediaFile from '../../../componets/modals/ModalGetMediaFile';
import useConfirmMessage from '../../../hooks/useConfirmMessage';


function EditProgramPage({ currentProgram }) {
    if(!currentProgram)
        return <></>

    const { name, days, startHour, finishHour, highlighted , urlImage} = currentProgram;
    const [ loadingPrimaryBtn, setLoadingPrimaryBtn ] = useState(false);
    const [ loadingDangerBtn, setLoadingDangerBtn ] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);

    const navigate = useNavigate();
    const { setMessage } = useMessage();
    const { openModal, openModalEvent, closeModalEvent } = useModal(false);
    const { setConfirmMessage } = useConfirmMessage();

    const updateHandler = (e) => {
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        const form = Object.fromEntries(new FormData(e.target));
        updateProgram({...form, file : currentFile}, currentProgram)
        .then(({ data }) => {
            setMessage({ message : data.message, type : 'success' });
            navigate('../');
        })
        .catch(e => {
            setLoadingPrimaryBtn(false);
            setMessage({ message: e, type : 'error' });
        })
    }

    const deleteHandler = (e) => {
        setLoadingDangerBtn(true);
        deleteProgram(currentProgram.id)
        .then(({ data }) => {
            setMessage({ message : data.message, type: 'success'});
            navigate('../');
        })
        .catch(e => {
            setLoadingDangerBtn(false);
            setMessage({ message: e, type : 'error' });
        })
    }

    const returnFile = (file) => {
        setCurrentFile(file);
        closeModalEvent()
    }

    const deleteEvent = (e) => {
        setConfirmMessage({
            text : '¿Esta seguro que desea eliminar el programa?',
            callback : deleteHandler,
        })
    }
    
    return (
        <>
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
                    
                    <label htmlFor='highlighted' className='label' >Destacado <input defaultChecked={highlighted} type="checkbox" name="highlighted" id="highlighted" /> </label>
                    
                    <SelectFile openModal={openModalEvent} currentFile={currentFile} />

                    <CustomButton type='primary' buttonType='submit' disabled={loadingDangerBtn || loadingPrimaryBtn} loading={loadingPrimaryBtn} >Actualizar programa</CustomButton>

                </form>
                <CustomButton onClickEvent={deleteEvent} type='danger' loading={loadingDangerBtn} disabled={loadingPrimaryBtn || loadingDangerBtn} >Eliminar programa</CustomButton>
            </div>
            { openModal && <ModalGetMediaFile closeModal={closeModalEvent} returnFile={returnFile} />}
        </>
     )
}

export default EditProgramPage