import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api-radio-eter-mdp.herokuapp.com/',
});


const loginUser = async (email, password) => {
    try{
        const res = await instance.post('/users/login',{email,password})
        return res.data.token;
    }
    catch(e){
        throw e.response.data.message
    }
    
}

export default loginUser;

