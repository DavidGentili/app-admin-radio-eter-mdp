import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import LoadingPage from '../../../componets/LoadingPage';
import SingleTransmission from '../../../componets/SingleTransmission';
import { ChevronIcon } from '../../../componets/Icons';
import { getTransmissions } from '../../../services/transmissions';


const TransmissionPanel = ({transmissions, setTransmission, sortTransmission, selectCurrentTransmission}) => {

    const [loadingPanel, setLoadingPanel] = useState(true);


    useEffect(() => {
        getTransmissions()
        .then(({ data }) => {
            setTransmission(data);
            setLoadingPanel(false)
        })
    }, [])

    const sortEvent = (value) => {
        return (e) => {
            sortTransmission(value);
        }
    } 

    if(loadingPanel)
        return <LoadingPage />

    return (
        <>
        <div className="transmissionPanel">
            <div className="headerPanel">
                    <button onClick={sortEvent('name')}>Nombre <ChevronIcon/> </button>
                    <button onClick={sortEvent('active')}>Estado <ChevronIcon/> </button>
                    <button onClick={sortEvent('startTransmission')}>Inicio <ChevronIcon/> </button>
                    <button onClick={sortEvent('finishTransmission')}>Fin <ChevronIcon/> </button>
                    <p>Acciones</p>
                </div>
            { transmissions.length > 0 &&
                transmissions.map(transmission => <SingleTransmission key={transmission.id} {...transmission} selectTransmission={selectCurrentTransmission(transmission)} />)
            }
        </div>

        <Link to='./nueva' className='primaryBtn'> + </Link>
        </>
    )
}

export default TransmissionPanel