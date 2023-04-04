import React, { useState } from 'react'
import CustomButton from '../../../componets/generalComponents/CustomButton';
import CustomInput from '../../../componets/generalComponents/CustomInput'
import InputTags from '../../../componets/generalComponents/InputTags';
import useSelectMedia from '../../../hooks/useSelectMedia';
import SelectFile from '../../../componets/generalComponents/SelectFile';
import { createPodcast } from '../../../services/podcast';
import useMessage from '../../../hooks/useMessage';
import { useNavigate } from 'react-router-dom';

export default function NewPodcastPage() {


    const [tags, setTags] = useState([]);
    const [isLoading, setLoading] = useState(false);
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
        const form = Object.fromEntries(new FormData(e.target))
        createPodcast({ ...form, currentFile, tags })
            .then(() => {
                setLoading(false)
                navigate('../')
            })
            .catch(e => {
                setLoading(false)
                setMessage({ message: e, type: 'error' });

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
            <InputTags tags={tags} setTags={setTags} />

            <SelectFile openModal={openModalEvent} currentFile={currentFile} />

            <div className="links">
                <h6>Links</h6>
                <CustomInput
                    name='spotify'
                    placeholder='Spotify'
                />
                <CustomInput
                    name='youtube'
                    placeholder='Youtube'
                />
                <CustomInput
                    name='google'
                    placeholder='Google Podcast'
                />
                <CustomInput
                    name='soundcloud'
                    placeholder='SoundCloud'
                />
            </div>

            <CustomButton buttonType='submit' type='primary' loadingButton={isLoading} disabled={isLoading} >Crear programa</CustomButton>


        </form>
    )
}
