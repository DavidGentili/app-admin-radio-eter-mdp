import { useState, useEffect } from "react";
import { getPodcastPrograms } from "../services/podcast";

const usePodcast = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        getPodcastPrograms()
            .then(res => {
                setPodcasts(res);
            })
            .catch(e => { })
    }, [])

    return { podcasts };
}

export default usePodcast;