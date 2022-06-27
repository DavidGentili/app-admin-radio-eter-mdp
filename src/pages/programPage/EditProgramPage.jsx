import React, { useState } from 'react'

import CustomInput from '../../componets/CustomInput';
import { ImageIcon } from '../../componets/Icons'
import { daysValues } from './daysValue';


function EditProgramPage({ currentProgram }) {
    if(!currentProgram)
        return <></>

    const { name, days, startHour, finishHour, highlighted , urlImage} = currentProgram;
    const [isHighlighted, setIsHighlighted] = useState(highlighted);
    const [ loadingPrimaryBtn, setLoadingPrimaryBtn ] = useState(false);
    const [ loadingDangerBtn, setLoadingDangerBtn ] = useState(false)
    const [ messageError, setMessageError ] = useState('');

    console.log(currentProgram)

    return (
        <div className='currentProgram'>
            <div className="imageContainer">
                {urlImage ? <img src={urlImage} alt={name} /> : <p>El programa no tiene una imagen</p>}
            </div>
            <form>
                <CustomInput name='name' value={name} focus placeholder='Nombre'  />
                <label htmlFor="" className='label'>Dias</label>
                <div className="days">
                    {daysValues.map(({ value, text }) => <label key={value} htmlFor={value} className='label' >{text} <input type="checkbox" name={value} id={value} /> </label>)}
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

                <button type='submit' className={`primaryBtn${loadingPrimaryBtn ? ' loadingBtn' : ''}`} disabled={loadingPrimaryBtn} >Actualizar programa</button>

            </form>
            <button  className={'dangerBtn ' + (loadingDangerBtn ? 'loadingBtn' : '')} disabled={loadingPrimaryBtn || loadingDangerBtn}>Eliminar programa</button>
            {messageError && <p className='messageError'>{messageError}</p>}

        </div>
     )
}

export default EditProgramPage