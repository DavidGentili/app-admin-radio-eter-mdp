import Atomic from "./Atomic";
import { RichUtils, EditorState, AtomicBlockUtils, convertFromHTML, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { compositeDecorator } from "./decorators";

export function getBlockRenderer(block){
    if(block.getType() === 'atomic') return { component : Atomic, editable : false}
    return null;
}

export function getCutomStyleMap(style, block){
    return {
        'CODE' : {
            fontSize: '1.1rem',
            margin: '24px auto',
            padding: '12px 64px',
            backgroundColor : '#F1F1F1',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',

        }
    }
}

export function getBlockStyle(block) {

    const type = block.getType();

    if(type === 'blockquote') return 'blockquote';

    return null;
}


export function getToogleInlineStyle(editorState, setEditorState){
    return (style) => {
        return () => {
            setEditorState(RichUtils.toggleInlineStyle(editorState, style));
        }
    }
    
}

export function getToogleBlockType(editorState, setEditorState){
    return (type) => {
        return () => {
            setEditorState(RichUtils.toggleBlockType(editorState, type));
        }
    }
}

export function getHandleKeyCommand(setEditorState){
    return (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }
}

export function getAddMedia(editorState, setEditorState){
    return (type, src = '', text = '') => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', { src, text });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditoState = EditorState.set(editorState, {currentContent : contentStateWithEntity });
        setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditoState, entityKey, ' '));
    }
}

const customRender = (nodeName, node) => {
    const { src, href } = node;
    if(nodeName === 'img') return { type: 'image', mutability: 'IMMUTABLE', data: { src }}
    if(nodeName === 'video') return { type: 'video', mutability: 'IMMUTABLE', data: { src }}
    if(nodeName === 'audio') return { type: 'audio', mutability: 'IMMUTABLE', data: { src }}
    if(nodeName === 'a') return { type: 'link', mutability: 'IMMUTABLE', data: { src : href }}
    return undefined
    
}

const styleMedia = 'width : 100%; heigth: auto;';

export function customEntityTransform(entity, text){

    const { type, data } = entity;
    const { src } = data;
    if(type === 'image') return `<img src="${src}" style="${styleMedia}"  />`
    if(type === 'audio') return `<audio src="${data.src}" style="${styleMedia}" controls> </audio>`
    if(type === 'video') return `<video src="${src}" style="${styleMedia}" controls> </video>`
    if(type === 'link') return `<a href="${src}" target="_blank" rel="noopener noreferrer">${src}</a>`
    return '<div></div>'
}

export function getInitialStateValue(value){
    if(!value)
        EditorState.createEmpty(compositeDecorator)
    const blockFromHtml = htmlToDraft(value, customRender);
    const { contentBlocks, entityMap } = blockFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap );
    return EditorState.createWithContent(contentState, compositeDecorator);

}
