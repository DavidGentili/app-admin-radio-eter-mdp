import { getHeaders, instance } from "./config";

export async function getTransmissions(){
    try{
        return await instance.get('/specialtransmission',{ headers : getHeaders() });
    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
} 


const getDataNewTransmission = (form) => {
    const { name, startTransmission, finishTransmission } = form
    if(!name || name.length < 3)
        throw 'Debe ingresar un nombre valido'
    if(!startTransmission || !finishTransmission)
        throw 'Debe ingresar fechas validas'
    const startDate = new Date(startTransmission);
    const finishDate = new Date(finishTransmission);
    if(finishDate < startDate)
        throw 'Debe ingresar fechas validas'
    return { name, startTransmission: startDate, finishTransmission: finishDate};
}

export async function createTransmission(form){
    try{
        const data = getDataNewTransmission(form);
        return  await instance.post('/specialTransmission', data, { headers: getHeaders()});
    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
} 

const compareDate = (firstDate, secondDate) => {
    const a = new Date(firstDate);
    const b = new Date(secondDate);
    return a - b;
}

const checkUpdateTransmissionData = (form) => {
    const { name, finishTransmission, startTransmission } = form
    if(!startTransmission || !finishTransmission || compareDate(startTransmission, finishTransmission) >= 0)
        throw 'Debe ingresar fechas validas';
    if(!name || name.length === 0)
        throw 'Debe ingresar un nombre correcto';
}

const getDataUpdateTransmission = (form, current) => {
    const data = {transmissionId : current.id};
    const { name, startTransmission, finishTransmission } = form;
    const active = (form.active && form.active === 'on') ? true : false; 
    if(name !== current.name)
        data.name = name;
    if(compareDate(startTransmission,current.startTransmission) !== 0)
        data.startTransmission = startTransmission;
    if(compareDate(finishTransmission,current.finishTransmission) !== 0)
        data.finishTransmission = finishTransmission;
    if(active !== current.active)
        data.active = active;

    if(Object.keys(data).length === 1)
        throw 'No se han registrado cambios';
    return data;
    
}

export async function updateTransmission(form, currentTransmission){
    try{
        checkUpdateTransmissionData(form);
        const data = getDataUpdateTransmission(form, currentTransmission);
        return await instance.put('/specialTransmission', data, { headers : getHeaders()});

    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function deleteTransmission(transmissionId){
    try{
        return await instance.delete('/specialTransmission', { data: { transmissionId }, headers: getHeaders()});

    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
}
