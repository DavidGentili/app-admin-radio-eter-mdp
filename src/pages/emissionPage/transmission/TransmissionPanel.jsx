import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//Components
import LoadingPage from '../../../componets/generalComponents/LoadingPage';
import SingleTransmission from '../../../componets/singleComponents/SingleTransmission';
import { ChevronIcon } from '../../../componets/Icons';

//Services
import { getTransmissions } from '../../../services/transmissions';
import ListPane from '../../../componets/generalComponents/ListPane';


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

    const headers = [
        {
            command : 'name',
            field : 'Nombre',
        },
        {
            command : 'active',
            field : 'Estado',
        },
        {
            command : 'startTransmission',
            field : 'Inicio',
        },
        {
            command : 'finishTransmission',
            field : 'Fin',
        },
    ]

                
    const elements = transmissions.map(transmission => <SingleTransmission key={transmission.id} {...transmission} selectTransmission={selectCurrentTransmission(transmission)} />);

    if(loadingPanel)
        return <LoadingPage />

    return <ListPane {...{headers, elements, sortAction : sortTransmission}} />

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