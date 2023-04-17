import { instance, getHeaders } from './config';

export async function getEpisodesWithPodcast() {
    try {
        const { data } = await instance.get('/episodes/withPodcast', { headers: getHeaders() });
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}

function checkNewEpisodeData(data) {
    const { title, podcastId } = data;
    if (!title || title.length < 3)
        throw 'Debe ingresar un nombre correcto';
    if (!podcastId)
        throw 'Debe seleccionar un podcast al cual asignarle el episodio';
}

export async function createEpisode(form) {
    try {
        const { title, description, podcastId, currentFile, spotify, youtube, google, soundcloud } = form;
        const urls = { spotify, youtube, google, soundcloud };
        const imgUrl = currentFile ? currentFile.url : undefined;
        const body = { title, description, podcastId, imgUrl, urls };
        checkNewEpisodeData(body);
        const { data } = await instance.post('/podcast/episode', body, { headers: getHeaders() });
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}

export async function updateEpisode(form) {
    try {
        const { id, title, description, podcastId, currentFile, spotify, youtube, google, soundcloud, active } = form;
        const urls = { spotify, youtube, google, soundcloud };
        const imgUrl = currentFile ? currentFile.url : undefined;
        const body = { episodeId: id, title, description, podcastId, imgUrl, urls, active: active ? true : false };
        console.log(body)
        const { data } = await instance.put('/episode', body, { headers: getHeaders() });
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}

export async function deleteEpisode({ episodeId, podcastId }) {
    try {

        const { data } = await instance.delete('/podcast/episode', { data: { podcastId, episodeId }, headers: getHeaders() });
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}