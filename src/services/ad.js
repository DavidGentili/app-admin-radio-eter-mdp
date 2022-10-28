import { instance, getHeaders } from './config';

const checkDataNewAd = (data) => {
    const { name, file } = data;
    if(!name || typeof(name) !== 'string' || name.length === 0)
        throw 'Debe ingresar un nombre correcto';
    if(!file ||  !file.url)
        throw 'Debe seleccionar un archivo archivo';
}

export async function createNewAd(data){
    try{
        checkDataNewAd(data)
        const { name, file, type, link, altText} = data;
        return await instance.post('/ad', { name, type, link, altText, urlImage : file.url }, {
            headers: getHeaders(),
        })
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }  
}

export async function getAds(){
    try{
        return await instance.get('/ad',{ headers : getHeaders() });
    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function deleteAd(id){
    try{
        return await instance.delete('/ad', { data: { adId : id }, headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

//retorna el payload requerido para hacer un put, en caso de no haber cambios retorna null
const getUpdateData = (newAd, currentAd) => {
    const updateData = {};
    const keys = ['name', 'altText', 'link', 'type', 'urlImage'];
    keys.forEach(key => {
        if(newAd[key] !== currentAd[key])
            updateData[key] = newAd[key];
    })
    return (Object.keys(updateData).length) ? {... updateData, adId: currentAd.id } : null

}

export async function updateAd(newAd, currentAd){
    const { file } = newAd;
    if(file && file.url)
        newAd.urlImage = file.url;
    const updateData = getUpdateData(newAd, currentAd);
    if(!updateData)
        throw 'No ha ingresado ningun cambio'
    try{
        return await instance.put('/ad', updateData, {headers: getHeaders()});   
    } catch(e){
        throw e.response ? e.response.data.message : e
    }
}