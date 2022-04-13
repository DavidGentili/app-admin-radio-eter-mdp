import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api-radio-eter-mdp.herokuapp.com/users',
});


const authUser = async () => {
    if(!localStorage.getItem('userToken'))
        throw {message: 'unauthorized user'}
    const res = await instance.get('/auth',{
        headers: {
            authorization: localStorage.getItem('userToken'),
        }
    })
    return res.data;
    
}

const loginUser = async (email, password) => {
    try{
        const res = await instance.post('/login',{email,password})
        return res.data.token;
    }
    catch(e){
        throw e.response.data.message
    }
    
}

const getUsers = async (id) => {
    const { data } = await instance(`${id ? ('id=' + id) : ''}`,{
        headers: {
            authorization: localStorage.getItem('userToken')
        }
    });
    return data
}


export default {
    authUser,
    loginUser,
    getUsers,
}