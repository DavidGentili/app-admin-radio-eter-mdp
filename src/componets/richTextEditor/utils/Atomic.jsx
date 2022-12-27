import React from 'react'

const styleMedia = {
    width : '100%',
    heigth : 'auto',
}

const Image = ({ src, text }) => {
    return <img src={src} alt={text} style={styleMedia}/>
}

const Video = ({ src, text }) => {
    return <video src={ src } alt={text} style={styleMedia} controls />
}

const Audio = ( { src, text } ) => {
    return <audio src={src} alt={text} style={styleMedia} controls />
}

const Link = ( { src, text } ) => {
    return <a href={src} target="_blank" rel="noopener noreferrer">{ text ? text : src }</a>
}

const Atomic = ({ contentState, block}) => {

    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src, text } = entity.getData();
    const type = entity.getType();

    if(type === 'image') return <Image src={src} text={text} />
    if(type === 'video') return <Video src={src} text={text} />
    if(type === 'audio') return <Audio src={src} text={text} />
    if(type === 'link') return <Link src={src} text={text} />

    return <div></div>
}

export default Atomic