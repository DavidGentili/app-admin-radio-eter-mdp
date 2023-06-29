import React, { useEffect, useState } from 'react'
import { getEpisodesWithPodcast } from '../../../services/episode'
import SingleEpisode from '../../../componets/singleComponents/SingleEpisode';
import ListPane from '../../../componets/generalComponents/ListPane';
import LoadingPage from '../../../componets/generalComponents/LoadingPage'

export default function EpisodePanel({ episodes, setEpisodes, selectEpisode, sortEpisodes }) {

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getEpisodesWithPodcast()
            .then((res) => {
                setEpisodes(res);
            })
            .catch(e => {

            })
            .finally(() => {
                setLoading(false);
            })
    })

    const headers = [
        { command: 'title', field: 'Titulo' },
        { command: 'podcastTitle', field: 'Podcast' },
        { command: 'active', field: 'Activo' },
    ]

    const singles = episodes.map(ep => <SingleEpisode {...{ ...ep, selectEpisode: selectEpisode(ep), key: ep.id }} />)

    return (
        <>
            {isLoading ? <LoadingPage /> : <ListPane {...{ elements: singles, headers, sortAction: sortEpisodes }} />}
        </>
    )
}
