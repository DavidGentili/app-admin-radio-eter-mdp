import { instance, getHeaders } from './config';



export async function getPodcastPrograms() {
    try {
        const { data } = await instance.get('/podcast', { headers: getHeaders() });
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}

function checkNewPodcastData(data) {
    const { title } = data;
    if (!title || title.length < 3)
        throw 'Debe ingresar un titulo';
}

export async function createPodcast(form) {
    try {
        const { title, description, tags, spotify, youtube, google, soundcloud, currentFile } = form;

        const urls = { spotify, youtube, google, soundcloud };
        const imgUrl = currentFile ? currentFile.url : '';

        const body = {
            title,
            description,
            urls,
            tags,
            imgUrl
        }
        checkNewPodcastData(body);
        const { data } = await instance.post('podcast', body, { headers: getHeaders() });
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}

export async function updatePodcast(form) {
    try {
        const { id, title, description, tags, spotify, youtube, google, soundcloud, currentFile } = form;

        const urls = { spotify, youtube, google, soundcloud };
        const imgUrl = currentFile ? currentFile.url : undefined;

        const body = {
            podcastId: id,
            title,
            description,
            urls,
            tags,
            imgUrl
        }
        console.log(body)
        checkNewPodcastData(body);
        const { data } = await instance.put('/podcast', body, { headers: getHeaders() })
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}

export async function deletePodcast(id) {
    try {

        const { data } = await instance.delete('/podcast', { data: { podcastId: id }, headers: getHeaders() })
        return data;
    } catch (e) {
        throw e.response ? e.response.data.message : e;
    }
}