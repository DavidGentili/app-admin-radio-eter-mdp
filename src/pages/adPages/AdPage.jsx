import {React, useCallback, useEffect, useState} from 'react'
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
            navigate('./editar')
        }
    } 

    const sortAd = useCallback(function(key){
        if(ads[0][key]){
            const sortAds = [...ads];
            sortAds.sort(function(a , b){
                return (a[key] <= b[key]) ? -1 : 1; 
            })
            setAds(sortAds);
        }
    }, [ads])

    if(loadingPage)
        return (<main className='adPage'> <LoadingPage/></main>)

    return (
        <main className='adPage'>
            <Routes >
                <Route path='nuevo' element={ <NewAdPage refreshPanel={refreshPanel} /> } /> 
                <Route path='' element={ <AdPanel {...{refreshPanel, selectAd, ads, sortAd}} />} />  
                <Route path='editar' element={<EditAdPage {...{currentAd, refreshPanel}}/>  }/>
            </Routes>
        </main>
    )
}

export default AdPage