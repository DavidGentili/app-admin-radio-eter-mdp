import { instance, getHeaders } from './config';


const authUser = async () => {
    if(!localStorage.getItem('userToken'))
        throw {message: 'unauthorized user'}
    try{
        const res = await instance.get('users/auth',{headers: getHeaders()})
        return res.data;
    } catch(e){
        throw e.response.data.message;
    }
}

const loginUser = async ({email, password}) => {
    try{
        if(!email || email.length < 4 || !password || password.length < 4)
            throw 'Usuario o contraseñas incorrecta';
        email = email.toLowerCase();
        const res = await instance.post('users/login',{email,password})
        return res.data.token;
    }
    catch(e){
        throw e.response ? e.response.data.message : e
    }
    
}

const getUsers = async (id) => {
    const { data } = await instance(`users${id ? ('/id=' + id) : ''}`,{headers: getHeaders()});
    return data
}

const signupUser = async ({name, email, securityLevel}) => {
    try{
        const { data } = await instance.post('users/signup',{name,email,securityLevel},{headers: getHeaders()})
        return data;
    }
    catch(e){
        throw e.response.data.message;
    }

}

const updateUser = async (updateData) => {
    try{
        const { data } = await instance.put('/users',updateData,{headers: getHeaders()});
        return data;
    } catch(e){
        throw e.response.data.message;
    }
}

const removeUser = async (userId) => {
    try{
        const { data } = await instance.delete('/users',{headers: getHeaders(), data: {id: userId}});
        return data;
    } catch(e) {
        throw e.response.data.message;
    }
}

const changePassword = async (currentPassword, newPassword) => {
    try{
        const { data } = await instance.put('users/password', { currentPassword, newPassword }, {headers: getHeaders()});
        return data;
    } catch (e) {
        throw e.response.data.message;
    }
}

export default {
    authUser,
    loginUser,
    getUsers,
    signupUser,
    updateUser,
    removeUser,
    changePassword,
}