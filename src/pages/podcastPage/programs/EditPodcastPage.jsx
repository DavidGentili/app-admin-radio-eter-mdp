import React, { useState } from 'react'
import CustomInput from '../../../componets/generalComponents/CustomInput'
import InputTags from '../../../componets/generalComponents/InputTags';
import useSelectMedia from '../../../hooks/useSelectMedia';
import SelectFile from '../../../componets/generalComponents/SelectFile';
import PodcastLinks from './PodcastLinks';
import CustomButton from '../../../componets/generalComponents/CustomButton';

export default function EditPodcastPage({ currentPodcast }) {

    const { id, title, imgUrl, description, active, tags, urls } = currentPodcast;
    const { spotify, google, youtube, soundcloud } = urls;

    const [localTags, setLocalTags] = useState(tags);
    const [currentFile, setCurrentFile] = useState(null);
    const [isLoading, setLoading] = useState(false)

    const selectMedia = useSelectMedia();

    const returnFile = (file) => {
        setCurrentFile(file);
    }

    const openModalEvent = (e) => {
        selectMedia({ callback: returnFile });
    }

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="currentPodcast">
            <img src="" alt="" />
            <form onSubmit={submit}>
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
                <InputTags tags={localTags} setTags={setLocalTags} />

                <SelectFile openModal={openModalEvent} currentFile={currentFile} />

                <PodcastLinks {...{ spotify, youtube, google, soundcloud }} />

                <CustomButton buttonType='submit' type='primary' loadingButton={isLoading} disabled={isLoading} >Actualizar podcast</CustomButton>

            </form>
        </div>
    )
}
