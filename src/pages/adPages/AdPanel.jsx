import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//Components
import SingleAd from '../../componets/singleComponents/SingleAd';
import { ChevronIcon } from '../../componets/Icons';
import LoadingPage from '../../componets/generalComponents/LoadingPage';

//Services
import { getAds } from '../../services/ad';
import ListPane from '../../componets/generalComponents/ListPane';


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

    const singles = ads.map(ad => <SingleAd key={ad.id} {...ad} selectAd={selectAd(ad)} />)
    const headers = [
        {
            command : 'name',
            field : 'Nombre',
        },
        {
            command : 'link',
            field : 'Link',
        },{
            command : 'type',
            field : 'Tipo',
        }
    ]

    return <ListPane {...{ elements : singles, headers, sortAction : sortAd}} />
}

export default AdPanel