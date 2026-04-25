import React from 'react';

//Components
import SingleContent from './SingleContent';

export default function ContentList({ contents, refreshContent, platformId }) {


    if (!contents || contents.length === 0)
        return <p className='emptyList'>No hay contenido</p>
    return (
        <div className='contentsList'>
            {contents.map(content => <SingleContent key={content.id} content={content} refreshContent={refreshContent} platformId={platformId} />)}
        </div>
    )
}