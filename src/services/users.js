import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api-radio-eter-mdp.herokuapp.com/users',
});

const headers = {
    authorization: localStorage.getItem('userToken')
}

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

const loginUser = async ({email, password}) => {
    try{
        if(!email || email.length < 4 || !password || password.length < 4)
            throw 'Usuario o contraseñas incorrecta';
        email = email.toLowerCase();
        const res = await instance.post('/login',{email,password})
        return res.data.token;
    }
    catch(e){
        throw e.response ? e.response.data.message : e
    }
    
}

const getUsers = async (id) => {
    const { data } = await instance(`${id ? ('id=' + id) : ''}`,{headers});
    return data
}

const signupUser = async ({name, email, securityLevel}) => {
    try{
        const { data } = await instance.post('signup',{name,email,securityLevel},{headers})
        return data;
    }
    catch(e){
        throw e.response.data.message
    }

}


export default {
    authUser,
    loginUser,
    getUsers,
    signupUser,
}