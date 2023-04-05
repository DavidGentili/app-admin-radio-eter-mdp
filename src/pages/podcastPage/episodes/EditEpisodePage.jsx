import React, { useState, useEffect } from 'react'

import CustomButton from '../../../componets/generalComponents/CustomButton';
import CustomInput from '../../../componets/generalComponents/CustomInput';
import SelectFile from '../../../componets/generalComponents/SelectFile';
import PodcastLinks from '../programs/PodcastLinks';
import useSelectMedia from '../../../hooks/useSelectMedia';
import useMessage from '../../../hooks/useMessage';
import { useNavigate } from 'react-router-dom';
import { getPodcastPrograms } from '../../../services/podcast';
import { deleteEpisode, updateEpisode } from '../../../services/episode';
import usePodcast from '../../../hooks/usePodcast';

export default function EditEpisodePage({ currentEpisode }) {

    const { id, title, description, imgUrl, urls, podcastId } = currentEpisode;
    const { spotify, youtube, soundcloud, google } = urls
    const { podcasts } = usePodcast();
    const [isLoading, setLoading] = useState(false);

    const [currentFile, setCurrentFile] = useState(null);
    const selectMedia = useSelectMedia();
    const setMessage = useMessage();
    const navigate = useNavigate();

    const currentPodcast = () => {
        const index = podcasts.findIndex(pod => pod.id === podcastId);
        return podcasts[index]
    }

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
        const data = { id, ...form, currentFile, }
        updateEpisode(data)
            .then((res) => {
                setLoading(false);
                navigate('../');
            })
            .catch(e => {
                setLoading(false);
                setMessage({ message: e, type: 'error' })
            })
    }

    const deleteEvent = (e) => {
        setLoading(true);
        deleteEpisode({ podcastId, episodeId : id})
        .then(() => {
            setLoading(false);
            setMessage({message: 'El episodio se ha borrado con exito', type: 'success'})
            navigate('../')
        })
        .catch(e => {
            setLoading(false);
            setMessage({message: e, type: 'error'})
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

                <label htmlFor="type" className='label'>Podcast</label>
                {
                    podcasts.length > 0
                        ?
                        <select name="podcastId"  defaultValue={podcastId}>
                            {podcasts.map(podcast => <option key={podcast.id} value={podcast.id}>{podcast.title}</option>)}
                        </select>
                        :
                        <p>No hay podcast cargados</p>
                }

                <SelectFile openModal={openModalEvent} currentFile={currentFile} />

                <PodcastLinks {...{ spotify, youtube, google, soundcloud }} />

                <div className="btnPanel">
                    <CustomButton text='Eliminar episodio' buttonType='button' type='danger' onClickEvent={deleteEvent} loading={isLoading} disabled={isLoading} />
                    <CustomButton buttonType='submit' type='primary' loadingButton={isLoading} disabled={isLoading} >Actualizar episodio</CustomButton>

                </div>

            </form>
        </div>
    )
}
