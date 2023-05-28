import axios from 'axios';
const urlBase = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export const instance = axios.create({
    baseURL: urlBase,
});

export function getHeaders(){
    return { "authorization" : localStorage.getItem('userToken') }
};
