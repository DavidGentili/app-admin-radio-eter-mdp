import { instance, getHeaders } from './config';

export async function getMediaFiles(){
    const { data } = await instance.get('/media', { headers : getHeaders()});
    return data;
}