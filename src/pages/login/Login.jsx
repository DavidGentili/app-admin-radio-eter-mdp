import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Isotipo from '../../componets/Isotipo'
import logo from '../../../assets/logo.png'
import LoadingPage from '../../componets/LoadingPage';

import userAPI from '../../services/users';

import './login.css'

const { loginUser, authUser } = userAPI;

const Login = () => {

    const [messageError, setMessageError] = useState(null);
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        authUser()
        .then(() => {
            navigate('/my-user');
        })
        .catch((e) => {
            setLoadingPage(false);
            
        })
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        const {email, password} = Object.fromEntries(new FormData(e.target));
        setMessageError(null);
        setLoadingButton(true);
        loginUser({email, password})
        .then((token) => {
            localStorage.setItem('userToken',token);
            navigate('/')
        })
        .catch((e) => {
            setMessageError(e);
        })
        .finally(() => {setLoadingButton(false)})
    }


    return (
        <>
            <Isotipo className='background-isotipo' fill='var(--lightBlue)' />
            { loadingPage ? <LoadingPage /> :
            <div className='container'>
                <img src={logo} alt="Radio Eter Mdp" className='logo' />
                <form className='loginForm' onSubmit={handlerSubmit}>
                    <input type="email" autoFocus placeholder='Email' name='email'/>
                    <input type="password" placeholder='Password' name='password'/>
                    <button type='submit' className={`primaryBtn${loadingButton ? ' loadingBtn' : ''}`} disabled={loadingButton} >{!loadingButton ? 'Login' : 'Loading'}</button>
                </form>
                {messageError && <p className='messageError'>{messageError}</p>}
            </div>
            }
        </>
       
    )
}

export default Login;