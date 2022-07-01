export function sortElements(array, setNewArray){
    return (key) => {
        if(array[0][key] !== undefined){
            const sortArray = [... array];
            sortArray.sort(function(a , b){
                if(typeof(a[key]) === 'boolean')
                    return (a[key] === false && b[key] === true) ? 1 : -1;
                if(typeof(a[key] === 'string'))
                    return (a[key].toLowerCase() <= b[key].toLowerCase()) ? -1 : 1;
                return (a[key] <= b[key]) ? -1 : 1; 
            });
            setNewArray(sortArray);
        }
    }
    
}
