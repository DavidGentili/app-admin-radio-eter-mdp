import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';


//Components
import CustomInput from '../../componets/generalComponents/CustomInput'
import CustomButton from '../../componets/generalComponents/CustomButton'
import SelectFile from '../../componets/generalComponents/SelectFile'
import RichTextEditor from '../../componets/richTextEditor/RichTextEditor';
import useSelectMedia from '../../hooks/useSelectMedia';

//Services
import { createNewReport } from '../../services/report';

//Hooks
import useMessage from '../../hooks/useMessage';
import InputTags from '../../componets/generalComponents/InputTags';

const NewReportPage = ({ refreshReports }) => {
  
    const [ content, setContent ] = useState('');
    const [ mainMedia, setMainMedia ] = useState(null);
    const [ tags, setTags ] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setMessage = useMessage();
    const inputTags = useRef(null);

    const selectMedia = useSelectMedia();

    const selectMediaEvent = (e) => {
        const callback = (file) => {
            setMainMedia(file)
        }
        selectMedia({ callback })
    }

    const submitEvent = (e) => {
        e.preventDefault();
        setLoading(true);
        createNewReport({
            ...Object.fromEntries(new FormData(e.target)),
            content,
            mainMediaUrl : mainMedia && mainMedia.url ? mainMedia.url : '',
            tags
        })
        .then(({ data }) => {
            refreshReports();
            setMessage({
                message : data.message ? data.message : 'Se creo correctamente el reporte',
                type : 'success',
            })
            setLoading(false);
            navigate('../');
        })
        .catch(e => {
            setLoading(false)
            setMessage({ message : e , type : 'error' });
        })

    }
  
    return (
        <form onSubmit={submitEvent}>
            <CustomInput type='text' placeholder='Titulo' name='title' focus />
            <CustomInput type='text' placeholder='Descripcion' name='description' />
            <label>Publicado <input type="checkbox" name="active" id="" /></label>
            <label>Imagen Principal</label>
            <SelectFile openModal={selectMediaEvent} currentFile={mainMedia} />
            <InputTags tags={tags} setTags={setTags} />

            <RichTextEditor value={content} setValue={setContent} />
            <CustomButton text='Agregar informe' buttonType='submit' type='primary' loading={loading} disabled={loading}/>
        </form>
    )
}

export default NewReportPage