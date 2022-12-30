import React, { useState } from 'react'
import useRichTextEditorModal from  '../../hooks/useRichTextEditorModal'

const MediaButtonToolbar = ({ icon, type, addMedia }) => {


    const richTextEditorModal = useRichTextEditorModal();

    const openModal = () => {
        const callback = ({ url, alt }) => {
            addMedia(type, url, alt)
        }
        
        richTextEditorModal({
            type,
            callback,
        })
    }

    return (
        <>
            <button onClick={openModal} type='button'>{icon}</button>
        </>
        
    )
}

export default MediaButtonToolbar