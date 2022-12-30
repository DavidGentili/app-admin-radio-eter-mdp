import { instance, getHeaders } from './config';


const checkReportData = ({ title, content, active}) => {
    if(!title || typeof(title) !== 'string' || title.length < 3)
        throw 'Debe ingresar un titulo correcto';
    if(!content || typeof(content) !== 'string')
        throw 'Debe ingresar contenido para publicar';
    if(typeof(active) !== 'boolean')
        throw 'No se ingreso correctamente el estado publicado';
}

const getReportData = (form) => {
    const { active } = form
    console.log(active)
    const data = {
        ...form, active : active && active === 'on' ? true : false,
    }
    return data;   
}

const getUpdateData = (current, update) => {
    const data = {reportId : current.id };
    const keys = Object.keys(current);
    keys.forEach(key => {
        if(typeof(update[key]) != 'undefined' && current[key] !== update[key]){
            data[key] = update[key];
        }        
    })
    if(Object.keys(data).length <=  1)
        throw 'No se han realizado modificaciones'
    return data;
}


export async function getReports(){
    try{
        const { data } = await instance.get('report',{ headers : getHeaders() });
        data.forEach(element => {element.lastModify = new Date(element.lastModify)})
        return data
    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
}


export async function createNewReport(form){
    try{
        const data = getReportData(form);
        checkReportData(data);
        return await instance.post('report', data, { headers : getHeaders()})
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}


export async function updateReport(form, currentReport){
    try{
        
        const data = getReportData(form);
        checkReportData(data);
        const updateData = getUpdateData(currentReport, data);
        return await instance.put('report', updateData, { headers : getHeaders()});

    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function deleteReport(id) {
    try{
        return await instance.delete('report', {data: {reportId: id}, headers: getHeaders()});
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}