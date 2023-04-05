import React, { useCallback, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import EpisodePanel from './EpisodePanel';
import NewEpisodePage from './NewEpisodePage';
import EditEpisodePage from './EditEpisodePage';
import ErrorPage from '../../errorPage/ErrorPage';

import './episodePage.css';

export default function EpisodePage() {

    const [episodes, setEpisodes] = useState([]);
    const [currentEpisode, setCurrtentEpisode] = useState(null);
    const navigate = useNavigate();

    const sortEpisodes = useCallback(function (key) {
        if (episodes[0][key]) {
            const aux = [...episodes];
            aux.sort((a, b) => (a[key] < b[key]) ? -1 : 1);
            setEpisodes(aux);
        }
    }, [episodes])

    const selectEpisode = (ep) => {
        return (e) => {
            setCurrtentEpisode(ep);
            navigate('./editar');

        }
    }

    return (
        <div className="episodePage">
            <Routes>
                <Route index element={<EpisodePanel {...{ episodes, setEpisodes, selectEpisode, sortEpisodes }} />} />
                <Route path='/nuevo' element={<NewEpisodePage />} />
                <Route path='editar' element={<EditEpisodePage {...{currentEpisode}} />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    )
}
