import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, AlignJustifyIcon, BlockquoteIcon, BoldIcon, CodeIcon, ItalicIcon, OlIcon, UlIcon, UnderlineIcon, ImageIcon, VideoIcon, LinkIcon, SoundIcon } from "./IconsToolbar";
import ButtonToolbar from "../ButtonToolbar";
import MediaButtonToolbar from "../MediaButtonToolbar";

class Button{

    constructor(order, name, icon, command,type){
        this.order = order;
        this.name = name;
        this.icon = icon;
        this.command = command;
        this.type = type;
    }
}

class MediaButton{

    constructor(order, type, icon, label){
        this.order = order;
        this.type = type;
        this.icon = icon;
        this.label = label;
    }
}

const buttons = [
    new Button(1, 'Bold', <BoldIcon/>, 'BOLD', 'line'),
    new Button(2, 'Italic', <ItalicIcon/>, 'ITALIC', 'line'),
    new Button(3, 'Underline', <UnderlineIcon/>, 'UNDERLINE', 'line'),
    new Button(11, 'Code', <CodeIcon/>, 'CODE', 'line'),
    // new Button(5, 'align-left', <AlignLeftIcon/>, 'align-left', 'block'),
    // new Button(6, 'align-center', <AlignCenterIcon/>, 'align-center', 'block'),
    // new Button(7, 'align-right', <AlignRightIcon/>, 'align-right' , 'block'),
    // new Button(8, 'align-justify', <AlignJustifyIcon/>, 'align-justify' , 'block'),
    new Button(9, 'UL', <UlIcon/>, 'unordered-list-item', 'block'),
    new Button(10, 'OL', <OlIcon/> , 'ordered-list-item', 'block'),
    new Button(4, 'Blockquote', <BlockquoteIcon/>, 'blockquote', 'block')
]

const mediaButtons = [
    new MediaButton(1, 'image', <ImageIcon />, 'agregar imagen'),
    new MediaButton(2, 'video', <VideoIcon />, 'agregar video'),
    new MediaButton(3, 'audio', <SoundIcon />, 'agregar audio'),
    new MediaButton(4, 'link', <LinkIcon />, 'agregar link'),

]

const sortByOrder = (a, b) => {
    return a.order - b.order;
}

export function getButtons(toogleInlineStyle, toogleBlockType){
    buttons.sort(sortByOrder)
    return buttons.map((btn) => {
        let event = null;
        if(btn.type === 'line') event = toogleInlineStyle;
        if(btn.type === 'block') event = toogleBlockType;
        const localProps = {
            ...btn,
            key: btn.order,
            event,
        }
        return <ButtonToolbar { ...localProps} /> 
    });
}

export function getMediaButtons(addMedia){
    mediaButtons.sort(sortByOrder);
    return mediaButtons.map(btn => {
        const localProps = {...btn, addMedia, key : btn.order}
        return <MediaButtonToolbar {...localProps} /> 
    })
}