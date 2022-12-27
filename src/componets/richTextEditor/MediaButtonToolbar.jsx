import React, { useState } from 'react'
import useRichTextEditorModal from '../hooks/useRichTextEditorModal'

const MediaButtonToolbar = ({ icon, type, addMedia }) => {


    const richTextEditorModal = useRichTextEditorModal();

    const openModal = () => {
        const callback = ({ url, text }) => {
            addMedia(type, url, text)
        }
        
        richTextEditorModal({
            type,
            callback,
        })
    }

    return (
        <>
            <button onClick={openModal} >{icon}</button>
        </>
        
    )
}

export default MediaButtonToolbar