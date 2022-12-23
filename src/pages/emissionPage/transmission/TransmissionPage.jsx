import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

//Components and Pages
import TransmissionPanel from './TransmissionPanel';
import NewTransmissionPage from './NewTransmissionPage';
import EditTransmissionPage from './EditTransmissionPage';
import ErrorPage from '../../errorPage/ErrorPage';

import { sortElements } from '../../../helpers/sortElements'

const TransmissionPage = () => {

    const [transmissions, setTransmission] = useState([]);
    const [currentTransmission, setCurrentTransmission] = useState(null);
    const navigate = useNavigate();


    const selectCurrentTransmission = (transmission) => {
        return (e) => {
            setCurrentTransmission(transmission);
            navigate('./editar')
        };
    }


    return (
        <div className='transmissionPage'>  
            <Routes>
                <Route path='' element={ <TransmissionPanel  {...{transmissions, setTransmission, sortTransmission : sortElements(transmissions, setTransmission), selectCurrentTransmission}}/> } />
                <Route path='/nuevo' element= { <NewTransmissionPage /> } />
                <Route path='/editar' element={ <EditTransmissionPage currentTransmission={currentTransmission} /> } />
                <Route path='*' element={ <ErrorPage/> } />
            </Routes>
        </div>   
  )
}

export default TransmissionPage