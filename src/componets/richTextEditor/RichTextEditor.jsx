import { React, useState, useRef, useCallback, useEffect } from 'react'
import { convertToRaw, Editor } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { 
    getHandleKeyCommand, 
    getToogleBlockType, 
    getToogleInlineStyle, 
    getAddMedia, 
    getInitialStateValue, 
    getBlockRenderer,
    getBlockStyle, 
    customEntityTransform,
    getCutomStyleMap,
} from './utils/utilsDraft';

import Toolbar from './Toolbar'


import 'draft-js/dist/Draft.css';
import './richTextEditor.css';

const RichTextEditor = ({ value, setValue }) => {

    const [editorState, setEditorState] = useState(getInitialStateValue(value));
    
    const editor = useRef(null);

    const toogleInlineStyle = useCallback(getToogleInlineStyle(editorState, setEditorState), [editorState])

    const toogleBlockType = useCallback(getToogleBlockType(editorState, setEditorState), [editorState]);

    const handleKeyCommand = useCallback(getHandleKeyCommand(setEditorState), [editorState]);

    const addMedia = useCallback(getAddMedia(editorState, setEditorState), [editorState]);

    const focusEditor = (e) => {
        if(editor.current != null)
            editor.current.focus();
    }

    useEffect(() => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const newValue = draftToHtml(rawContent, undefined, undefined, customEntityTransform);
        newValue.replace(/\&nbsp;/g,' ');
        setValue(newValue);
    }, [editorState])

    //imagen: https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg
    //video: https://static.pexels.com/lib/videos/free-videos.mp4
    //audio: https://cdn.videvo.net/videvo_files/audio/premium/audio0137/watermarked/mi_explosion_03_hpx_preview.mp3

    return (
        <div className="wrapperEditor">
            <Toolbar {...{toogleInlineStyle, toogleBlockType, addMedia }} />
            <div className="editorContain" onFocus={focusEditor} onClick={focusEditor}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={getCutomStyleMap()}
                    blockRendererFn={getBlockRenderer}
                    ref={editor}
                    placeholder='Some text...'
                />
            </div>
        </div>
    )
}

export default RichTextEditor