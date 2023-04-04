import React, { useEffect, useState } from 'react'
import { getPodcastPrograms } from '../../../services/podcast';
import ListPane from '../../../componets/generalComponents/ListPane';
import SinglePodcast from '../../../componets/singleComponents/SinglePodcast';

export default function PodcastPanel({ podcasts, setPodcasts, selectPodcast, sortPodcast }) {

    useEffect(() => {
        getPodcastPrograms()
            .then((res) => {
                setPodcasts(res);
            })
            .catch(e => {

            })
    }, [])

    const headers = [
        {
            command: 'title',
            field: 'Titulo',
        },
        {
            command: 'active',
            field: 'Activo',
        }
    ]

    const singles = podcasts.map(podcast => (
        <SinglePodcast key={podcast.id} {...{ ...podcast, selectPodcast: selectPodcast(podcast) }} />
    ))

    return (
        <ListPane {...{ elements: singles, headers, sortAction: sortPodcast }} />
    )
}
