import React from 'react'
import { Link } from 'react-router-dom';

import SingleAd from '../../componets/SingleAd';
import { ChevronIcon } from '../../componets/Icons';


const AdPanel = ({selectAd, ads, sortAd}) => {


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
            <Link to='./newAd' className='primaryBtn'> + </Link>
        </>
    )
}

export default AdPanel