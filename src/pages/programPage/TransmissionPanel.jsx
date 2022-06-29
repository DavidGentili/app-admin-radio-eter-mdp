import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import LoadingPage from '../../componets/LoadingPage';
import SingleTransmission from '../../componets/SingleTransmission';
import { ChevronIcon } from '../../componets/Icons';
import { getTransmissions } from '../../services/transmissions';


const TransmissionPanel = ({transmissions, setTransmission, sortTransmission}) => {

    const [loadingPanel, setLoadingPanel] = useState(true);


    useEffect(() => {
        getTransmissions()
        .then(({ data }) => {
            setTransmission(data);
            setLoadingPanel(false)
        })
    }, [])

    if(loadingPanel)
        return <LoadingPage />

    return (
        <>
        <div className="transmissionPanel">
            <div className="headerPanel">
                    <button onClick={(e) => {sortTransmission('name')}}>Nombre <ChevronIcon/> </button>
                    <button onClick={(e) => {sortTransmission('active')}}>Estado <ChevronIcon/> </button>
                    <button onClick={(e) => {sortTransmission('startTransmission')}}>Inicio <ChevronIcon/> </button>
                    <button onClick={(e) => {sortTransmission('finishTransmission')}}>Fin <ChevronIcon/> </button>
                    <p>Acciones</p>
                </div>
            { transmissions.length > 0 &&
                transmissions.map(transmission => <SingleTransmission key={transmission.id} {...transmission} />)
            }
        </div>

        <Link to='./nueva' className='primaryBtn'> + </Link>
        </>
    )
}

export default TransmissionPanel