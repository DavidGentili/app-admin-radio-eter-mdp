import {React, useState, useEffect } from 'react';

//Componets
import LoadingPage from '../LoadingPage';
import NewMediaForm from '../mediaPanel/NewMediaForm';
import { ChevronIcon } from '../Icons';
import SingleMedia from '../../componets/mediaPanel/SingleMedia';

//Services
import { getMediaFiles, deleteMediaFile } from '../../services/media';

//Hooks
import useMessage from '../../hooks/useMessage';

//Styles
import './mediaPanel.css';
import CustomButton from '../CustomButton';

const MediaPanel = ({ returnFile }) => {

    const FILES_PER_PAGE = 8;

    const [mediaFiles, setMediaFiles] = useState([]);
    const [currentFiles, setCurrentFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const { setMessage } = useMessage();


    const getFiles = () => {
        setLoadingPage(true);
        getMediaFiles()
        .then(data => {
            setMediaFiles(data);
            setCurrentPage(0);
        })
        .catch(e => {
            setMessage({message: e.message, type: 'error'});
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

    const returnCurrentFile = (e) => {
        if(selectedFile)
            returnFile(selectedFile);
    }

    return(
        <div className='mediaPanel'>
            <NewMediaForm refreshScreen={getFiles} />
            {
                loadingPage ? 
                    <LoadingPage /> 
                :
                    <div className="mediaContent">
                        {currentFiles.length > 0 && currentFiles.map(file => <SingleMedia key={file.id} file={file} selectFile={setSelectedFile} deleteEvent={deleteFileEvent} isSelect={selectedFile === file}/>)}
                    </div>   
            }
            <div className="paginationControls">
                <button className='prevControl' onClick={prevPage}> <ChevronIcon/> </button>
                <p>{currentPage + 1}</p>
                <button className='nextControl' onClick={nextPage}> <ChevronIcon/> </button>
            </div>
            {returnFile && <CustomButton onClickEvent={returnCurrentFile} text='Agregar archivo' buttonType='submit' type='secondary' />}
        </div>
    )
}

export default MediaPanel;