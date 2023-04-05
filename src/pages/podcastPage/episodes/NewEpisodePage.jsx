import React, { useEffect, useState } from 'react'

import CustomButton from '../../../componets/generalComponents/CustomButton';
import CustomInput from '../../../componets/generalComponents/CustomInput';
import SelectFile from '../../../componets/generalComponents/SelectFile';
import PodcastLinks from '../programs/PodcastLinks';
import useSelectMedia from '../../../hooks/useSelectMedia';
import useMessage from '../../../hooks/useMessage';
import { useNavigate } from 'react-router-dom';
import { getPodcastPrograms } from '../../../services/podcast';
import { createEpisode } from '../../../services/episode';
import usePodcast from '../../../hooks/usePodcast';

export default function NewEpisodePage() {

    const [isLoading, setLoading] = useState(false);
    const { podcasts } = usePodcast()
    const [currentFile, setCurrentFile] = useState(null);
    const selectMedia = useSelectMedia();
    const setMessage = useMessage();
    const navigate = useNavigate();



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
        const data = { ...form, currentFile, }
        createEpisode(data)
            .then((res) => {
                setLoading(false);
                navigate('../');
            })
            .catch(e => {
                setLoading(false);
                setMessage({ message: e, type: 'error' })
            })

    }


    return (
        <form onSubmit={submit}>
            <CustomInput
                focus
                name='title'
                placeholder='Titulo'
            />
            <CustomInput
                name='description'
                placeholder='Descripcion'
            />

            <label htmlFor="type" className='label'>Podcast</label>
            {
                podcasts.length > 0
                    ?
                    <select name="podcastId">
                        {podcasts.map(podcast => <option key={podcast.id} value={podcast.id}>{podcast.title}</option>)}
                    </select>
                    :
                    <p>No hay podcast cargados</p>
            }

            <SelectFile openModal={openModalEvent} currentFile={currentFile} />

            <PodcastLinks />

            <CustomButton buttonType='submit' type='primary' loadingButton={isLoading} disabled={isLoading} >Crear episodio</CustomButton>

        </form>
    )
}
