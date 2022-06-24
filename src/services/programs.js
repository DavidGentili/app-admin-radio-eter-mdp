import { getHeaders, instance } from "./config";

export async function getPrograms(){
    try{
        return await instance.get('programs', { headers: getHeaders() });
    } catch(e) {
        throw e.response ? e.response.data.message : e;
    }
}