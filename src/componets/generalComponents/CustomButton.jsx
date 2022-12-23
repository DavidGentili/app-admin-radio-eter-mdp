import React from 'react'

const getClassName = {
    danger: () => 'dangerBtn',
    primary: () => 'primaryBtn',
    secondary: () => 'secondaryBtn',
    normal: () => 'normal'
}
const CustomButton = (props) => {
    const { onClickEvent = () => {}, text, type, buttonType, disabled, loading, children } = props;
    const className = getClassName[getClassName[type] ? type : 'normal']();
    return (
        <button 
        type={buttonType ? buttonType : 'button'} 
        onClick={onClickEvent}  
        className={`${className} ${loading && 'loadingBtn'} `} 
        disabled={disabled}>
            {text || children || 'Boton'}
        </button>
    )
}


export default CustomButton