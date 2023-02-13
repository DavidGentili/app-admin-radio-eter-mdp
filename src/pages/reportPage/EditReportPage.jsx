import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


//Components
import CustomInput from '../../componets/generalComponents/CustomInput';
import CustomButton from '../../componets/generalComponents/CustomButton';
import SelectFile from '../../componets/generalComponents/SelectFile';
import RichTextEditor from '../../componets/richTextEditor/RichTextEditor';
import ErrorPage from '../errorPage/ErrorPage';
import InputTags from '../../componets/generalComponents/InputTags'

//Services
import { deleteReport, updateReport } from '../../services/report';

//Hooks
import useMessage from '../../hooks/useMessage';
import useSelectMedia from '../../hooks/useSelectMedia';


const EditReportPage = ({ selectedReport, refreshReports }) => {

    const { id, title, description, mainMediaUrl, active } = selectedReport
    const initialContent = selectedReport && selectedReport.content ? selectedReport.content : ''
    const currentTags = selectedReport?.tags || []

    const [content, setContent] = useState(initialContent);
    const [mainMedia, setMainMedia] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [tags, setTags] = useState(currentTags)

    const selectMedia = useSelectMedia();
    const setMessage = useMessage();
    const navigate = useNavigate();

    const selectMediaEvent = (e) => {
        const callback = (file) => {
            setMainMedia(file)
        }
        selectMedia({ callback })
    }

    const deleteEvent = (e) => {
        e.preventDefault();
        setLoadingDelete(true);
        deleteReport(id)
        .then(({ data }) => {
            setMessage({ message: data.message, type : 'success' })
            refreshReports()
            setLoadingDelete(false);
            navigate('../');
        })
        .catch(e => {
            setMessage({ message : e, type : 'error' });
            setLoadingDelete(false);
        })
    }

    const updateEvent = (e) => {
        e.preventDefault(e)
        setLoadingUpdate(true);
        updateReport({
            ...Object.fromEntries(new FormData(e.target)),
            content,
            mainMediaUrl : mainMedia && mainMedia.url ? mainMedia.url : undefined,
            tags
        }, selectedReport)
        .then(({ data }) => {
            setMessage({ message : data.message, type : 'success' });
            setLoadingUpdate(false);
            refreshReports();
            navigate('../');
        })
        .catch(e => {
            setMessage({ message : e, type : 'error' });
            setLoadingUpdate(false);
        })
    }
    
    if(!selectedReport){
        navigate('../');
        return <ErrorPage/>
    }


    return (
        <form onSubmit={updateEvent}>
            <div className='currentImage'>
                {mainMediaUrl ? <img src={mainMediaUrl} /> : <p> El informe no tiene imagen principal </p>}
            </div>
            <CustomInput type='text' placeholder='Titulo' name='title' value={title} focus />
            <CustomInput type='text' placeholder='Descripcion' name='description' value={description} />
            <label>Publicado <input type="checkbox" name="active" id="" defaultChecked={active} /></label>
            <label>Imagen Principal</label>
            <SelectFile openModal={selectMediaEvent} currentFile={mainMedia} />
            <InputTags tags={tags} setTags={setTags} />
            <RichTextEditor value={content} setValue={setContent} />
            <div className="btnPanel">
                <CustomButton text='Eliminar informe' buttonType='button' type='danger' onClickEvent={deleteEvent} loading={loadingDelete} disabled={loadingDelete | loadingUpdate} />
                <CustomButton text='Actualizar informe' buttonType='submit' type='primary' loading={loadingUpdate} disabled={loadingDelete | loadingUpdate}/>
            </div>
        </form>
    )
}

export default EditReportPage