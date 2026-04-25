import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//Components
import CustomInput from '../../componets/generalComponents/CustomInput';
import CustomButton from '../../componets/generalComponents/CustomButton';
import ContentList from './platformContent/ContentList';
import AddContent from './platformContent/AddContent';

//Services
import { updateContent, deleteContent, removeContent } from '../../services/content';


//Hooks
import useMessage from '../../hooks/useMessage';

export default function EditContentPanel({ selectedContent, refreshContent }) {

    const { name, contents } = selectedContent;
    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const setMessage = useMessage();
    const navigate = useNavigate();

    console.log(selectedContent)


    function handlerUpdateData(e) {
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        const form = Object.fromEntries(new FormData(e.target));
        updateContent(selectedContent.id, form)
        .then(({ data }) => {
            setMessage({ message : data?.message, type : 'success' });
        })
        .catch(e => {
            setLoadingPrimaryBtn(false);
            setMessage({ message : e, type : 'error' });
        })
    }

    function deleteEvent(e) {
        e.preventDefault();
        setLoadingDangerBtn(true);
        deleteContent(selectedContent.id)
        .then(({ data }) => {
            setMessage({ message : data?.message, type : 'success' });
            navigate('../');
        })
        .catch(e => {
            setLoadingDangerBtn(false);
            setMessage({ message : e, type : 'error' });
        })
    }

    return (
            <div className="currentContent">
                <form onSubmit={handlerUpdateData}>
                    <CustomInput focus name='name' value={name} placeholder='Nombre' />
                    <CustomButton text='Actualizar Nombre' buttonType='submit' type='primary' loading={loadingPrimaryBtn} disabled={loadingDangerBtn || loadingPrimaryBtn}/>
                </form>

                <AddContent platformId={selectedContent.id} refreshContent={refreshContent} />



                <ContentList contents={contents} refreshContent={refreshContent} platformId={selectedContent.id} />

                <CustomButton text='Eliminar publicidad' type='danger' loading={loadingDangerBtn} disabled={loadingDangerBtn || loadingPrimaryBtn} onClickEvent={deleteEvent} />
            </div>
    )
}