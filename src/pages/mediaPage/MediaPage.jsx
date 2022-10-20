import React, { useEffect, useState } from 'react';
import LoadingPage from '../../componets/LoadingPage';

import { getMediaFiles, deleteMediaFile, postMediaFile } from '../../services/media';
import NewMediaForm from './NewMediaForm';

import './mediaPage.css';
import SingleMedia from './SingleMedia';
import UIMessage from '../../componets/UIMessage';

const MediaPage = () => {

    const [mediaFiles, setMediaFiles] = useState([]);
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

    const deleteFileEvent = (id) => {
        return (e) => {
            e.preventDefault();
            deleteFile(id);
        }
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
                        {mediaFiles.length > 0 && mediaFiles.map(file => <SingleMedia key={file.id} file={file} selectFile={setSelectedFile} deleteEvent={deleteFileEvent} isSelect={selectedFile === file}/>)}
                    </div>
            }
        </main>
    )
}

export default MediaPage;