import { React, useState } from 'react'

import { CloseIcon } from '../Icons'
import CustomInput from '../CustomInput';
import { ImageIcon } from '../Icons';

const ModalNewAd = ({closeModal}) => {



    return (
        <section className='modalContainer'>
                <div className='modalWindow'>
                    
                    <div className="headerModal">
                        <h4>Agregar publicidad</h4>
                        <button onClick={closeModal}> <CloseIcon /> </button>
                    </div>

                    <form >

                        <CustomInput name='name' focus placeholder='Nombre' type='text' />
                        <label htmlFor="description" className='label'>Descripcion (opcional)</label>
                        <textarea name='description' id='description' placeholder='Descripcion'/>
                        <label htmlFor="type" className='label'>Tipo</label>
                        <select name="type" id="type">
                            <option value="standard">Estandar (privada)</option>
                            <option value="oficial"> Oficial (pauta)</option>
                        </select>
                        <label htmlFor="data" className='label labelInputFile'>
                            Cargue una imagen
                            <ImageIcon />
                            <input type="file" name="data" id="data" accept='image'/>

                        </label>
                        <button type='submit' className='primaryBtn'>Agregar publicidad</button>
                    </form>
                </div>
                {/* {messageError && <p className='messageError'>{messageError}</p>} */}
            </section>
    )
}

export default ModalNewAd