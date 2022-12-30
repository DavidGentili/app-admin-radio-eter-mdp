import React from 'react'
import { RichUtils } from 'draft-js';

const ButtonToolbar = ({ name, icon, command, event}) => {
    const onClickEvent = (!event || !command) ? () => {} : event(command);

    return(
        <button onClick={onClickEvent} type='button'>
            {icon}
            <span className="label">{name}</span>
        </button>
    )
}

export default ButtonToolbar