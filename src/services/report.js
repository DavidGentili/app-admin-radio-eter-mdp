import { instance, getHeaders } from './config';


export async function getReports(){
    try{
        const { data } = await instance.get('/report',{ headers : getHeaders() });
        data.forEach(element => {element.lastModify = new Date(element.lastModify)})
        return data
    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
}



const checkNewReportData = ({ title, content, active}) => {
    if(!title || typeof(title) !== 'string' || title.length < 3)
        throw 'Debe ingresar un titulo correcto';
    if(!content || typeof(content) !== 'string')
        throw 'Debe ingresar contenido para publicar';
    if(typeof(active) !== 'boolean')
        throw 'No se ingreso correctamente el estado publicado';
}

const getNewReportData = (form) => {
    const { title, description, active, mainMediaUrl, content } = form
    const data = {
        ...form, active : active && active === 'on' ? true : false,
    }
    checkNewReportData(data);
    return data;
    
}

export async function createNewReport(form){
    try{
        const data = getNewReportData(form);
        return await instance.post('/programs', data, { headers : getHeaders()})
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}