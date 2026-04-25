import React from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import { TrashIcon } from '../../../componets/Icons';

//Hooks
import useMessage from '../../../hooks/useMessage';

//Services
import { removeContent } from '../../../services/content';

export default function SingleContent({ content, refreshContent, platformId }) {

    const { title, src, order, link, active } = content;
    const navigate = useNavigate();
    const setMessage = useMessage();

    function deleteContent(e) {
        e.preventDefault();
        removeContent(platformId, content._id)
        .then(({ data }) => {
            setMessage({ message : data?.message, type : 'success' });
        })
        .catch(e => {
            setMessage({ message : e, type : 'error' });
        })
        .finally(() => {
            refreshContent();
        })
    }

    return (
        <div className='singleContent'>
            <img src={src} alt={title} />
            <h6>{title}</h6>
            {link ? <p>{link}</p> : <span className='empty'>No hay link</span>}
            <button className='deleteContent' onClick={deleteContent}> <TrashIcon/> Eliminar contenido </button>
        </div>
    );
}
