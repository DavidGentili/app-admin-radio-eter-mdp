import React from 'react'

const getClassName = {
    danger: () => 'dangerBtn',
    primary: () => 'primaryBtn',
    normal: () => 'normal'
}
const CustomButton = (props) => {
    const { onClickEvent, text, type, buttonType, disabled, loading } = props;
    const className = getClassName[getClassName[type] ? type : 'normal']();
    return (
        <button type={buttonType ? buttonType : 'button'} onClick={onClickEvent}  className={loading ? `${className} loadingBtn` : className} disabled={disabled}>{text}</button>
    )
}


export default CustomButton