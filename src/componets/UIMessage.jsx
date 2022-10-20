import { React, useRef } from 'react'

const getClassName = {
    success: () => 'messageSuccess',
    error: () => 'messageError',
    warning: () => 'messageWarning',
    normal: () => 'messageNormal'
}

const empthyFunction = () => {}

const UIMessage = ({ text, type, cleanMessage }) => {

    const nameClass = getClassName[getClassName[type] ? type : 'normal']()
    const msg = useRef(null);

    const removeMessage = (e) => {
        e.preventDefault();
        if(msg.current){
            msg.current.classList.add('hidden')
            console.log(msg.current);
        }
        if(cleanMessage)
            setTimeout(cleanMessage, 600)
    }


    return (
        <div ref={msg} className={`msg ${nameClass}`}>
            <button onClick={ removeMessage } >X</button>
            <p> {text} </p>
        </div>
        
    )
}

export default UIMessage