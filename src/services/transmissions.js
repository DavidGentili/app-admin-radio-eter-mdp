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
