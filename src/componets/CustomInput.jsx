import { React, useState, forwardRef } from "react";


const supportedTypes = ["text", "email", "password"];

const CustomInput = forwardRef( (props, ref) => {
    const { name, type, id, placeholder, focus} = props
    const [notEmptyInput, setNotEmptyInput] = useState(false);

  return (
        <label
        htmlFor=""
        className={"customInput " + (notEmptyInput ? "notEmpty" : "")}
        >
        <input
                type={supportedTypes.includes(type) ? type : "text"}
                name={name ? name : ''}
                id={id ? id : ''}
                autoFocus={focus ? true : false}

                onChange={(e) => {
                    setNotEmptyInput(e.target.value.length === 0 ? false : true);
                }}
        />
      <span>{placeholder}</span>
    </label>
  );
});

export default CustomInput;