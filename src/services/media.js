import { instance, getHeaders } from './config';

export async function getMediaFiles(){
    try{
        const { data } = await instance.get('/media', { headers : getHeaders()});
        return data;
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