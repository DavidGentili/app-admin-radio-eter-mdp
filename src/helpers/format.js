export function getFormatTime(data){
    const date = new Date(data);
    const year = new String(date.getFullYear()).padStart(4,0);
    const month = new String(date.getMonth() + 1 ).padStart(2,0);
    const day = new String(date.getDate()).padStart(2,0);
    const hour = new String(date.getUTCHours()).padStart(2,0);
    const minutes = new String(date.getUTCMinutes()).padStart(2,0); 
    return `${year}-${month}-${day}T${hour}:${minutes}`
}