import React, { useEffect } from 'react'
import { getEpisodesWithPodcast } from '../../../services/episode'
import SingleEpisode from '../../../componets/singleComponents/SingleEpisode';
import ListPane from '../../../componets/generalComponents/ListPane';

export default function EpisodePanel({ episodes, setEpisodes, selectEpisode, sortEpisodes }) {

    useEffect(() => {
        getEpisodesWithPodcast()
            .then((res) => {
                setEpisodes(res);
            })
            .catch(e => {

            })
    })

    const headers = [
        { command: 'title', field: 'Titulo' },
        { command: 'podcastTitle', field: 'Podcast' },
        { command: 'active', field: 'Activo' },
    ]

    const singles = episodes.map(ep => <SingleEpisode {...{ ...ep, selectEpisode: selectEpisode(ep), key: ep.id }} />)

    return (
        <ListPane {...{ elements: singles, headers, sortAction: sortEpisodes }} />
    )
}
