import {React, useCallback, useState} from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom';


import NewAdPage from './newAdPage';
import AdPanel from './AdPanel';
import EditAdPage from './EditAdPage';
import ErrorPage from '../errorPage/ErrorPage';

import './adPage.css'



const AdPage = () => {

    const [currentAd, setCurrentAd] = useState(null);
    const [ads, setAds] = useState([]);

    const navigate = useNavigate();


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

    return (
        <main className='adPage'>
            <Routes >
                <Route path='nuevo' element={ <NewAdPage /> } /> 
                <Route path='' element={ <AdPanel {...{selectAd, ads, sortAd, setAds}} />} />  
                <Route path='editar' element={<EditAdPage {...{currentAd}}/>  }/>
                <Route path='*' element={ <ErrorPage/> } />
            </Routes>
        </main>
    )
}

export default AdPage