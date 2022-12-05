import { instance, getHeaders } from './config';


const getMediaWithDate = (media) =>{
    return {
        ...media,
        createdAt : media.createdAt ? new Date(media.createdAt) : undefined, 
    }
}

const sortByDate = (a, b) => {
    if(!a.createdAt)
        return 1;
    if(!b.createdAt)
        return -1;
    return b.createdAt - a.createdAt;
}


export async function getMediaFiles(){
    try{
        const { data } = await instance.get('/media', { headers : getHeaders()});
        if(!Array.isArray(data))
            return data;

        const dataArray = data.map(media => getMediaWithDate(media));
        dataArray.sort(sortByDate);
        return dataArray; 
    } catch(e){
        throw e.response || e;
    }

}

export async function deleteMediaFile(mediaId){
    try{
        const { data } = await instance.delete('/media', { headers: getHeaders(), data : { mediaId }});
        return data;
    } catch(e){
        throw e.response || e;
    }

}

const getFormData = (form) => {
    if(!form || !form.file || form.file.size === 0)
        throw { message: 'Debe ingresar un archivo' }
    const formData = new FormData();
    formData.append('name', form.name || 'Nombre');
    formData.append('type', form.type || 'media');
    formData.append('mediaFile', form.file);

    return formData;

}

export async function postMediaFile(form){
    try{
        const data = getFormData(form);
        const response = await instance.post('/media', data, { headers: {...getHeaders(), "Content-Type" : "multipart/form-data"}});
        return response.data;
    } catch(e){
        throw e.response || e;
    }
}