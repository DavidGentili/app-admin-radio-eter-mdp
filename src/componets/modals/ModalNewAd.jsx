import { React, useState } from 'react'

import { CloseIcon } from '../Icons'
import CustomInput from '../CustomInput';

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
                        <CustomInput />
                        
                    </form>
                </div>
                {/* {messageError && <p className='messageError'>{messageError}</p>} */}
            </section>
    )
}

export default ModalNewAd