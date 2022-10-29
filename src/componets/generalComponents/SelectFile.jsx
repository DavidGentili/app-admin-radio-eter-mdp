import React from 'react'

import { ImageIcon } from '../Icons'

const SelectFile = ( { currentFile, openModal} ) => {
    return (
        <div className={`selectFile ${currentFile ? 'loaded' : ''}`} onClick={openModal}> 
            <ImageIcon/>
            {currentFile ? <p>{currentFile.name}</p> : <p>Seleccionar archivo</p>}
            <span></span>                  
        </div>
    )
}

export default SelectFile