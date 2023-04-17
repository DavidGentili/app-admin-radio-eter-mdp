import React, { useState } from 'react'
import CustomInput from '../../../componets/generalComponents/CustomInput'
import InputTags from '../../../componets/generalComponents/InputTags';
import useSelectMedia from '../../../hooks/useSelectMedia';
import SelectFile from '../../../componets/generalComponents/SelectFile';
import PodcastLinks from './PodcastLinks';
import CustomButton from '../../../componets/generalComponents/CustomButton';
import { deletePodcast, updatePodcast } from '../../../services/podcast';
import useMessage from '../../../hooks/useMessage';
import { useNavigate } from 'react-router-dom';
import EpisodeOfPodcastPanel from './EpisodeOfPodcastPanel'

export default function EditPodcastPage({ currentPodcast }) {

    const { id, title, imgUrl, description, active, tags, urls } = currentPodcast;
    const { spotify, google, youtube, soundcloud } = urls;

    const [localTags, setLocalTags] = useState(tags);
    const [currentFile, setCurrentFile] = useState(null);
    const [isLoading, setLoading] = useState(false)

    const setMessage = useMessage();
    const navigate = useNavigate();
    const selectMedia = useSelectMedia();

    const returnFile = (file) => {
        setCurrentFile(file);
    }

    const openModalEvent = (e) => {
        selectMedia({ callback: returnFile });
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = Object.fromEntries(new FormData(e.target));
        const data = { id, ...form, tags, currentFile };
        updatePodcast(data)
            .then((res) => {
                setLoading(false);
                navigate('../')
            })
            .catch(e => {
                setMessage({ message: e, type: 'error' })
                setLoading(false);
            })

    }

    const deleteEvent = (e) => {
        setLoading(true);
        deletePodcast(id)
            .then(() => {
                setLoading(false);
                setMessage({ message: 'Se elimino  correctamente el podcast', type: 'success' });
                navigate('../');
            })
            .catch(e => {
                setLoading(false)
                setMessage({ message: e, type: 'error' });
            })
    }

    return (
        <div className="currentPodcast">
            <form onSubmit={submit}>
                <div className="currentImage">
                    {imgUrl ? <img src={imgUrl} alt="" /> : <p> El podcast no tiene imagen principal </p>}

                </div>
                <CustomInput
                    name='title'
                    placeholder='Titulo'
                    value={title}
                />
                <CustomInput
                    name='description'
                    placeholder='Descripcion'
                    value={description}
                />

                <label className='checkLabel'>Activo <input type="checkbox" name='active' defaultChecked={active}/></label>
                <InputTags tags={localTags} setTags={setLocalTags} />

                <SelectFile openModal={openModalEvent} currentFile={currentFile} />

                <PodcastLinks {...{ spotify, youtube, google, soundcloud }} />

                <div className="btnPanel">
                    <CustomButton text='Eliminar podcast' buttonType='button' type='danger' onClickEvent={deleteEvent} loading={isLoading} disabled={isLoading} />
                    <CustomButton buttonType='submit' type='primary' loadingButton={isLoading} disabled={isLoading} >Actualizar podcast</CustomButton>

                </div>

            </form>
            <EpisodeOfPodcastPanel id={id} />
        </div>
    )
}
