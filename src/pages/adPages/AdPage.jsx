import {React, useEffect, useState} from 'react'
import { Routes, Route} from 'react-router-dom';

import ModalNewAd from '../../componets/modals/ModalNewAd';
import LoadingPage from '../../componets/LoadingPage';
import { getAds } from '../../services/ad';
import NewAdPage from './newAdPage';
import AdPanel from './AdPanel';

import './adPage.css'



const AdPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [currentAd, setCurrentAd] = useState(null);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        getAds()
        .then(({ data }) => {
            setAds(data);
            setLoadingPage(false)
        })
        .catch(e =>{
        }) 
    }, [])

    const closeModal = (e) => {
        setOpenModal(false);
    }

    const selectAd = (ad) => {
        return (e) => {
            e.preventDefault();
            setCurrentAd(ad);
        }
    } 

    if(loadingPage)
        return (<main className='adPage'> <LoadingPage/></main>)

    return (
        <main className='adPage'>
            <Routes >
                <Route path='newAd' element={ <NewAdPage /> } /> 
                <Route path='' element={ <AdPanel selectAd={selectAd} ads={ads} />} />  
            </Routes>
        </main>

            // {openModal && <ModalNewAd closeModal={closeModal} />}

    )
}

export default AdPage