import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Isotipo from '../../componets/Isotipo'
import logo from '../../../assets/logo.png'

import loginUser from '../../services/login';

import './login.css'

const Login = () => {

    const [messageError, setMessageError] = useState(null);
    const [loadingButton, setLoadingButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        const {email, password} = Object.fromEntries(new FormData(e.target));
        loginUser(email, password)
        .then((token) => {
            localStorage.setItem('userToken',token);
            navigate('/')
        })
        .catch((e) => {
            setMessageError(e);
        })
    }


    return (
        <>
            <Isotipo className='background-isotipo' fill='var(--lightBlue)' />
            <div className='container'>
                <img src={logo} alt="Radio Eter Mdp" className='logo' />
                <form className='loginForm' onSubmit={handlerSubmit}>
                    <input type="email" placeholder='Email' name='email'/>
                    <input type="password" placeholder='Password' name='password'/>
                    <button type='submit' className='primaryBtn'>Login</button>
                </form>
                {messageError && <p className='messageError'>{messageError}</p>}
            </div>
        </>
       
    )
}

export default Login;