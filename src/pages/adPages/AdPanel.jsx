import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import SingleAd from '../../componets/SingleAd';
import { ChevronIcon } from '../../componets/Icons';
import { getAds } from '../../services/ad';
import LoadingPage from '../../componets/LoadingPage';

const AdPanel = ({selectAd, ads, sortAd, setAds}) => {

    const [loadingPanel, setLoadingPanel ] = useState(true); 

    useEffect(() => {
        getAds()
        .then(({ data }) => {
            setAds(data);
            setLoadingPanel(false);
        })
        .catch(e =>{
        }) 
    }, [])

    if(loadingPanel)
        return <LoadingPage />

    return (
        <>
            <div className="adPanel">
                <div className="headerPanel">
                    <button onClick={(e) => {sortAd('name')}}>Nombre <ChevronIcon/> </button>
                    <button onClick={(e) => {sortAd('link')}}>Link <ChevronIcon/> </button>
                    <button onClick={(e) => {sortAd('type')}}>tipo <ChevronIcon/> </button>
                    <p>Acciones</p>
                </div>
                { (ads.length > 0) &&
                    ads.map(ad => <SingleAd key={ad.id} {...ad} selectAd={selectAd(ad)}/>)        
                }
            </div>
            <Link to='./nuevo' className='primaryBtn'> + </Link>
        </>
    )
}

export default AdPanel