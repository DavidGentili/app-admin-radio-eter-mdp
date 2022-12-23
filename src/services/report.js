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



const checkNewReportData = (data) => {

}

const getNewReportData = (form) => {
    const {  } = form
    const data = {

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