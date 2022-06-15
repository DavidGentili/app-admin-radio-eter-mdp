import axios from 'axios';

// 'https://api-radio-eter-mdp.herokuapp.com/ad'
// 'http://localhost:9000/ad'

const instance = axios.create({
    baseURL: 'http://localhost:9000/ad',
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
    formData.append('ad', file);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('link', link);
    formData.append('altText', altText);
    return formData;
}

export async function createNewAd(form){
    checkDataNewAd(form);
    instance.post('', createFormDataNewAd(form), {
        headers: { "Content-Type" : "multipart/form-data", ... getHeaders()},
    })
    .then(data => { return data})
    .catch(e => console.log(e))   
}

export async function getAds(){
    try{
        return await instance.get('',{ headers : getHeaders() });
    }catch(e){
        return e.response.data.message
    }
}

export async function deleteAd(id){
    try{
        return await instance.delete('',{adId : id}, { headers : getHeaders()});
    } catch(e){
        return e.response.data.message
    }
}