import { React, useState, forwardRef } from "react";


const supportedTypes = ["text", "email", "password"];

const CustomInput = forwardRef( (props, ref) => {
    const { name, type, placeholder, focus, value, disabled, onKey = () => {}} = props
    const [notEmptyInput, setNotEmptyInput] = useState( value ? true : false);

  return (
        <label
        htmlFor=""
        className={"customInput " + (notEmptyInput ? "notEmpty" : "")}
        >
        <input
                type={supportedTypes.includes(type) ? type : "text"}
                name={name ? name : ''}
                autoFocus={focus ? true : false}
                defaultValue={value ? value : ''}
                disabled={disabled ? true : false}
                ref={ref}
                onChange={(e) => {
                    setNotEmptyInput(e.target.value.length === 0 ? false : true);
                }}
                onKeyDown={onKey}
        />
      <span>{placeholder}</span>
    </label>
  );
});

export default CustomInput;