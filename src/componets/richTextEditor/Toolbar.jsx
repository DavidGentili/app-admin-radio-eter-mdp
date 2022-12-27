import React from 'react'
import { getButtons, getMediaButtons } from './utils/BtnsToolbar'


const Toolbar = ({ toogleInlineStyle, toogleBlockType, addMedia}) => {
    

    return (
            <div className="toolbar">
            <div className="textBtns">
                {getButtons(toogleInlineStyle, toogleBlockType)}
            </div>
            <div className="mediaBtns">
                {getMediaButtons(addMedia)}
            </div>
        </div>
    )
}

export default Toolbar