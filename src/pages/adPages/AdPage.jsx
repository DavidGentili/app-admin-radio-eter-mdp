import {React, useEffect, useState} from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom';


import LoadingPage from '../../componets/LoadingPage';
import { getAds } from '../../services/ad';
import NewAdPage from './newAdPage';
import AdPanel from './AdPanel';
import EditAdPage from './EditAdPage';

import './adPage.css'



const AdPage = () => {

    const [loadingPage, setLoadingPage] = useState(true);
    const [currentAd, setCurrentAd] = useState(null);
    const [ads, setAds] = useState([]);

    const navigate = useNavigate();

    const refreshPanel = async () => {
        getAds()
        .then(({ data }) => {
            setAds(data);
        })
        .catch(e =>{
        }) 
    }

    useEffect(() => {
        refreshPanel().then(() => {
            setLoadingPage(false)
        });
    }, [])

    const selectAd = (ad) => {
        return (e) => {
            e.preventDefault();
            setCurrentAd(ad);
            navigate('./editad')
        }
    } 

    if(loadingPage)
        return (<main className='adPage'> <LoadingPage/></main>)

    return (
        <main className='adPage'>
            <Routes >
                <Route path='newAd' element={ <NewAdPage refreshPanel={refreshPanel} /> } /> 
                <Route path='' element={ <AdPanel {...{refreshPanel, selectAd, ads}} />} />  
                <Route path='editad' element={<EditAdPage {...{currentAd, refreshPanel}}/>  }/>
            </Routes>
        </main>
    )
}

export default AdPage