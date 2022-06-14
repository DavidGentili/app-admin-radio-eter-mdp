import {React, useEffect, useState} from 'react'

import ModalNewAd from '../../componets/modals/ModalNewAd';
import LoadingPage from '../../componets/LoadingPage';
import { getAds } from '../../services/ad';
import SingleAd from '../../componets/SingleAd';

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
        <>
            <main className='adPage'>
                <div className="adPanel">
                    { (ads.length > 0) &&
                        ads.map(ad => <SingleAd key={ad.id} {...ad} selectAd={selectAd(ad)}/>)        
                    }
                </div>
                
                <button className='primaryBtn' onClick={(e) => {setOpenModal(true)}}> + </button>
            </main>

            {openModal && <ModalNewAd closeModal={closeModal} />}
        </>
    )
}

export default AdPage