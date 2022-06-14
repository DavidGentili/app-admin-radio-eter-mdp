import React from 'react'
import { Link } from 'react-router-dom';

import SingleAd from '../../componets/SingleAd';


const AdPanel = ({selectAd, ads}) => {


    return (
        <>
            <div className="adPanel">
                { (ads.length > 0) &&
                    ads.map(ad => <SingleAd key={ad.id} {...ad} selectAd={selectAd(ad)}/>)        
                }
            </div>
            <Link to='./newAd' className='primaryBtn'> + </Link>
        </>
    )
}

export default AdPanel