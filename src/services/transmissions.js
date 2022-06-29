import { getHeaders, instance } from "./config";

export async function getTransmissions(){
    try{
        return await instance.get('/specialtransmission',{ headers : getHeaders() });
    }catch(e){
        throw e.response ? e.response.data.message : e;
    }
} 
