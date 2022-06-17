import axios from 'axios';
import { urlBase } from './config';

const instance = axios.create({
    baseURL: `${urlBase}/ad`,
});

const getHeaders = () => {
    return {"authorization" : localStorage.getItem('userToken')}
};


const checkDataNewAd = (form) => {
    const { name, file } = form
    if(!name || typeof(name) !== 'string' || name.length === 0)
        throw 'Debe ingresar un nombre correcto';
    if(!file ||  !file.type || typeof(file.type) !== 'string' || !file.type.startsWith('image/'))
        throw 'Error al cargar el archivo';
}

const createFormDataNewAd = (form) => {
    const { name, file, type, altText, link } = form;
    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('link', link);
    formData.append('altText', altText);
    return formData;
}

export async function createNewAd(form){
    try{
        checkDataNewAd(form)
        return await instance.post('', createFormDataNewAd(form), {
            headers: { "Content-Type" : "multipart/form-data", ... getHeaders()},
        })
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }  
}

export async function getAds(){
    try{
        return await instance.get('',{ headers : getHeaders() });
    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function deleteAd(id){
    try{
        return await instance.delete('', { data: { adId : id }, headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

//retorna el payload requerido para hacer un put, en caso de no haber cambios retorna null
const getUpdateData = (newAd, currentAd) => {
    const updateData = {};
    const keys = ['name', 'altText', 'link', 'type'];
    keys.forEach(key => {
        if(newAd[key] !== currentAd[key])
            updateData[key] = newAd[key];
    })
    return (Object.keys(updateData).length) ? {... updateData, adId: currentAd.id } : null

}

export async function updateAd(newAd, currentAd){
    const updateData = getUpdateData(newAd, currentAd);
    if(!updateData)
        throw 'No ha ingresado ningun cambio'
    try{
        console.log(updateData);
        return await instance.put('', updateData, {headers: getHeaders()});   
    } catch(e){
        throw e.response ? e.response.data.message : e
    }
}