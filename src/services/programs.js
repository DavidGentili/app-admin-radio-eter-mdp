import { getHeaders, instance } from "./config";

export async function getPrograms(){
    try{
        return await instance.get('programs', { headers: getHeaders() });
    } catch(e) {
        throw e.response ? e.response.data.message : e;
    }
}

const daysValues = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']


const checkNewProgramData = (data) => {
    if(data.name.length < 3)
        throw 'Debe ingresar un nombre';
    if(data.startHour.length === 0 || data.finishHour.length === 0)
        throw 'Debe ingresar un horario valido';
    if(data.days.every(day => !day))
        throw 'Debe seleccionar al menos un dia'
}

const getNewProgramData = (form) => {
    const { name, startHour, finishHour, file } = form
    const data = {
        highlighted: (form.highlighted && form.highlighted === 'on') ? true : false,
        days : daysValues.map(function(day) {
            return form[day] ? true : false; 
        }),
        name,
        startHour,
        finishHour,
    }
    checkNewProgramData(data);
    if(file && file.url)
        data.urlImage = form.file.url;
    return data;
    
}

export async function createNewProgram(form){
    try{
        const data = getNewProgramData(form);
        return await instance.post('/programs', data, { headers : getHeaders()})
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function deleteProgram(id){
    try{
        return await instance.delete('programs', {data: {programId: id}, headers: getHeaders()});
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

const compareValue = (a , b) => {
    if(Array.isArray(a) && Array.isArray(b))
        return a.every(function(value, i){return value == b[i];})
    else
        return a === b
}

const getUpdateData = (form, currentProgram) => {
    const { file } = form;
    form.highlighted = (form.highlighted && form.highlighted === 'on') ? true : false;
    form.days = daysValues.map(function(day) {
        return form[day] ? true : false; 
    })
    const keys = Object.keys(currentProgram);
    const data = {programId: currentProgram.id};
    keys.forEach(key => {
        if(typeof(form[key]) != 'undefined' && !compareValue(form[key], currentProgram[key])){
            data[key] = form[key];
        }        
    })

    if(file && file.url)
            data.urlImage = form.file.url;
    return data;
}

export async function updateProgram(form, currentProgram){
    try{
        const data = getUpdateData(form, currentProgram);
        if(Object.keys(data).length === 1)
            throw 'No se han cargado modificaciones';
        return await instance.put('/programs', data, { headers: getHeaders()});
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}