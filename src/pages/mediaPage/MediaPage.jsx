import React, { useEffect, useState } from 'react';
import LoadingPage from '../../componets/LoadingPage';

import { getMediaFiles, deleteMediaFile, postMediaFile } from '../../services/media';
import NewMediaForm from './NewMediaForm';
import { ChevronIcon } from '../../componets/Icons';

import './mediaPage.css';
import SingleMedia from './SingleMedia';
import UIMessage from '../../componets/UIMessage';

const MediaPage = () => {

    const FILES_PER_PAGE = 8;

    const [mediaFiles, setMediaFiles] = useState([]);
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [message, setMessage] = useState({message : '', type : 'success'})

    const cleanMessage = (e) => {
        setMessage({message : '', type : 'normal'})
    }

    const getFiles = () => {
        setLoadingPage(true);
        getMediaFiles()
        .then(data => {
            setMediaFiles(data);
            setCurrentPage(0);
        })
        .catch(e => {

        })
        .then(() => {
            setLoadingPage(false);
        })
    }

    const deleteFile = (mediaId) => {
        deleteMediaFile(mediaId)
        .then(data => {
            setMessage({message : data.message, type: 'success'});
            getFiles();
        })
        .catch(e => {
            setMessage({ message: e.message, type: 'warning'});
        })
    }

    useEffect(() => {
        getFiles();
    }, [])

    useEffect(() => {
        const init = currentPage * FILES_PER_PAGE;
        const final = init + FILES_PER_PAGE;
        setCurrentFiles(mediaFiles.slice(init,final))
    }, [mediaFiles, currentPage])

    const deleteFileEvent = (id) => {
        return (e) => {
            e.preventDefault();
            deleteFile(id);
        }
    }

    const nextPage = (e) => {
        if((currentPage + 1) * FILES_PER_PAGE < mediaFiles.length )
            setCurrentPage(currentPage + 1);
    }

    const prevPage = (e) => {
        if(currentPage != 0)
            setCurrentPage(currentPage - 1);
    }

    return (
        <main className="mediaPage">
            <NewMediaForm refreshScreen={getFiles} setMessage={setMessage} />
            {message.message.length > 0 && <UIMessage text={message.message} type={message.type} cleanMessage={cleanMessage} />}
            {
                loadingPage ? 
                    <LoadingPage /> 
                : 
                    <div className="mediaPanel">
                        {currentFiles.length > 0 && currentFiles.map(file => <SingleMedia key={file.id} file={file} selectFile={setSelectedFile} deleteEvent={deleteFileEvent} isSelect={selectedFile === file}/>)}
                    </div>
            }
            <div className="paginationControls">
                <button className='prevControl' onClick={prevPage}> <ChevronIcon/> </button>
                <p>{currentPage + 1}</p>
                <button className='nextControl' onClick={nextPage}> <ChevronIcon/> </button>
            </div>
        </main>
    )
}

export default MediaPage;