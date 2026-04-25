import { instance, getHeaders } from './config';


export async function getContent(){
    try{
        const { data } = await instance.get('/platform-content', { headers: getHeaders() });
        return data;
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function getContentById(id){
    try{
        return await instance.get(`/platform-content/${id}`, { headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}


export async function createContent(content){
    try{
        return await instance.post('/platform-content', content, { headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function updateContent(id, content){
    try{
        return await instance.put(`/platform-content/${id}`, content, { headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function deleteContent(id){
    try{
        return await instance.delete(`/platform-content/${id}`, { headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function addContent(contentId, content) {
    try{
        return await instance.post(`/platform-content/${contentId}/content`, content, { headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}

export async function removeContent(contentId, itemId) {
    try{
        return await instance.delete(`/platform-content/${contentId}/content/${itemId}`, { headers: getHeaders() });
    } catch(e){
        throw e.response ? e.response.data.message : e;
    }
}