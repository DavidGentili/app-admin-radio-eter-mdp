import React, { useEffect, useState } from 'react';
import LoadingPage from '../../componets/LoadingPage';

import { getMediaFiles } from '../../services/media';
import NewMediaForm from './NewMediaForm';

import './mediaPage.css';
import SingleMedia from './SingleMedia';

const MediaPage = () => {

    const [mediaFiles, setMediaFiles] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);

    useEffect(() => {
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
    }, [])


    return (
        <main className="mediaPage">
            <NewMediaForm />
            {
                loadingPage ? 
                    <LoadingPage /> 
                : 
                    <div className="mediaPanel">
                        {mediaFiles.length > 0 && mediaFiles.map(file => <SingleMedia key={file.id} file={file} selectFile={setSelectedFile} isSelect={selectedFile === file}/>)}
                    </div>
            }
            
        </main>
    )
}

export default MediaPage;