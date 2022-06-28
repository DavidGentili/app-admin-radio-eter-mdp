import React from 'react'
import PropTypes from 'prop-types';

const getClassName = {
    danger: () => 'dangerBtn',
    primary: () => 'primaryBtn',
    normal: () => 'normal'
}
const CustomButton = (props) => {
    const { onClickEvent, text, type, buttonType, disabled, loading } = props;
    const className = getClassName[getClassName[type] ? type : 'normal']();
    return (
        <button type={buttonType} onClick={onClickEvent}  className={loading ? `${className} loadingBtn` : className} disabled={disabled}>{text}</button>
    )
}

CustomButton.PropTypes = {
    onClickEvent : PropTypes.func,
    text : PropTypes.string,
    type : PropTypes.string,
    buttonType : PropTypes.string,
    disabled : PropTypes.bool,
    loading : PropTypes.bool,
}


export default CustomButton