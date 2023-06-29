import React, { useRef } from 'react'

import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
import Tag from './Tag'

const InputTags = ({ tags, setTags }) => {

    const inputTags = useRef(null)

    const addTag = (value) => {
        if(value){
            const set = new Set(tags)
            set.add(value.toLowerCase());
            setTags(Array.from(set));
        }

    }

    const deleteTag = (value) => {
        const set = new Set(tags);
        set.delete(value.toLowerCase());
        setTags(Array.from(set));
    } 

    const addTagEvent = (e) => {
        e.preventDefault();
        addTag(inputTags.current.value);
        inputTags.current.value = ('');
    }

    const onKeyEvent = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            addTagEvent(e);
        }
    }

    return (
        <div className="tags">
            <label>
                <CustomInput type='text' placeholder='Etiquetas' name='tags' ref={inputTags} onKey={onKeyEvent}/>
                <CustomButton type='secondary' onClickEvent={addTagEvent} >Agregar tag</CustomButton>
            </label>
            <div className="tagContainer">
                {tags.map(tag => <Tag key={tag} value={tag} deleteTag={deleteTag}/> )}
            </div>
        </div>


    )
}

export default InputTags