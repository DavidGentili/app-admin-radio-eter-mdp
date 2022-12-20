import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

//Components
import CustomInput from '../../componets/generalComponents/CustomInput';
import CustomButton from '../../componets/generalComponents/CustomButton';
import SelectFile from '../../componets/generalComponents/SelectFile';
import ModalGetMediaFile from '../../componets/modals/ModalGetMediaFile';

//Services
import { deleteAd, updateAd } from '../../services/ad';

//Hooks
import useMessage from '../../hooks/useMessage';
import useModal from '../../hooks/useModal';
import useConfirmMessage from '../../hooks/useConfirmMessage';


const EditAdPage = ( { currentAd } ) => {
    
    const navigate = useNavigate();
    const [loadingPrimaryBtn, setLoadingPrimaryBtn] = useState(false);
    const [loadingDangerBtn, setLoadingDangerBtn] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);
    const { urlImage, altText, name, link, type} = currentAd ? currentAd : {};
    const setMessage = useMessage();
    const { openModal, openModalEvent, closeModalEvent } = useModal(false);
    const { setConfirmMessage } = useConfirmMessage();
    
    useEffect(() => {
        if(!currentAd)
            navigate('../');
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoadingPrimaryBtn(true);
        const newAd = {...Object.fromEntries(new FormData(e.target)), file : currentFile };
        updateAd(newAd, currentAd)
        .then(({ data }) => {
            setLoadingPrimaryBtn(false);
            setMessage({ message: data.message, type : 'success'});
            navigate('../')
        })
        .catch(e => {
            setLoadingPrimaryBtn(false);
            setMessage({ message : e , type : 'error' });
        })
    }

    const removeHandler = (e) => {
        setLoadingDangerBtn(true);
        deleteAd(currentAd.id)
        .then(({data}) => {
            setLoadingDangerBtn(false);
            setMessage({ message: data.message, type: 'success'});
            navigate('../')
        })
        .catch(e => {
            setLoadingDangerBtn(false);
            setMessage({ message : e , type : 'error' });
        })
    }

    const deleteEvent = () => {
        setConfirmMessage({
            text: '¿Esta seguro que desea eliminar la publicidad?',
            callback : removeHandler,
        })
    }

    const selectCurrentFile = (file) => {
        if(file && file.url)
            setCurrentFile(file)
        closeModalEvent();
    }

    if(!currentAd)
    return <></>


    return (
        <>
            <div className="currentAd">
                <img src={ urlImage ? urlImage : ''} alt={ altText ? altText : '' } />
                <form onSubmit={handlerSubmit}>
                    <CustomInput focus name='name' value={name} placeholder='Nombre' />
                    <CustomInput name='link' value={link} placeholder='Link' />
                    <label htmlFor="altText" className='label'>Texto Alternativo <span>opcional</span></label>
                    <textarea name='altText' id='altText' placeholder='Texto Alternativo' defaultValue={altText}/>
                    <label htmlFor="type" className='label'>Tipo</label>
                    <select name="type" id="type" defaultValue={type}>
                        <option value="standard">Estandar (privada)</option>
                        <option value="oficial"> Oficial (pauta)</option>
                    </select>
                    <SelectFile openModal={openModalEvent} currentFile={currentFile} />
                    <CustomButton text='Actualizar publicidad' buttonType='submit' type='primary' loading={loadingPrimaryBtn} disabled={loadingDangerBtn || loadingPrimaryBtn}/>
                </form>
                <CustomButton text='Eliminar publicidad' type='danger' loading={loadingDangerBtn} disabled={loadingDangerBtn || loadingPrimaryBtn} onClickEvent={deleteEvent} />
            </div>
            {openModal && <ModalGetMediaFile closeModal={closeModalEvent} returnFile={selectCurrentFile}/>}
        </>
    )
}

export default EditAdPage