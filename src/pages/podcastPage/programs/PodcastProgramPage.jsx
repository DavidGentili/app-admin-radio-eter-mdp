import React, { useState, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import PodcastPanel from './PodcastPanel';
import ErrorPage from '../../errorPage/ErrorPage';
import NewPodcastPage from './NewPodcastPage';
import EditPodcastPage from './EditPodcastPage';

import './programPodcastPage.css'

export default function PodcastProgramPage() {

    const [podcasts, setPodcasts] = useState([]);
    const [currentPodcast, setCurrtentPodcast] = useState(null);
    const navigate = useNavigate();


    const selectPodcast = (podcast) => {
        return () => {
            setCurrtentPodcast(podcast);
            navigate('./editar');
        }
    }

    const sortPodcast = useCallback(function (key) {
        if (podcasts[0][key]) {
            const aux = [...podcasts];
            aux.sort(function (a, b) {
                return (a[key] <= b[key]) ? -1 : 1;
            })
            setPodcasts(aux);
        }
    }, [podcasts])

    return (
        <div className="podcastProgramPage">
            <Routes>
                <Route index element={<PodcastPanel {...{ podcasts, setPodcasts, selectPodcast, sortPodcast }} />} />
                <Route path='/nuevo' element={<NewPodcastPage />} />
                <Route path='/editar' element={<EditPodcastPage currentPodcast={currentPodcast} />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    )
}
