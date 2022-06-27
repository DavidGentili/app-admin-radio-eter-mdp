import { getHeaders, instance } from "./config";

export async function getPrograms(){
    try{
        return await instance.get('programs', { headers: getHeaders() });
    } catch(e) {
        throw e.response ? e.response.data.message : e;
    }
}

const daysValues = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const createFormDataNewProgram = (form) => {
    const { name, startHour, finishHour, highlighted} = form;
    const days = daysValues.map(function(day) {
        return form[day] ? true : false; 
    })
    const formData = new FormData();

    formData.append('name', name);
    formData.append('days', days ? days : new Array(7).fill(false));
    formData.append('startHour', startHour ? startHour : '');
    formData.append('finishHour', finishHour ? finishHour : '');
    formData.append('highlighted', highlighted ? true : false);
    if(highlighted && form.file.size > 0)
        formData.append('imageFile', form.file);
    return formData;
}

export async function createNewProgram(form){
    try{
        const data = createFormDataNewProgram(form);
        return await instance.post('/programs', data, { headers : { ...getHeaders(), "Content-Type" : "multipart/form-data"}})
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}