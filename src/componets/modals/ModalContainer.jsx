import React from 'react'

import { CloseIcon } from '../Icons'

const ModalContainer = ({children, title, closeModal, extraClassName}) => {
    return (
        <section className='modalContainer'>
            <div className={`modalWindow ${extraClassName ? extraClassName : ''}`}>

                <div className="headerModal">
                    <h4>{title}</h4>
                    <button onClick={closeModal}> <CloseIcon /> </button>
                </div>

                { children }
            </div>
        </section >
    )
}

export default ModalContainer