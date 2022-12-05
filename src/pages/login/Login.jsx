import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

//Components
import Isotipo from '../../componets/Isotipo'
import logo from '../../../assets/logo.png'
import LoadingPage from '../../componets/generalComponents/LoadingPage';
import CustomInput from '../../componets/generalComponents/CustomInput';

//Hooks
import useMessage from '../../hooks/useMessage';

//Services
import { loginUser, authUser } from '../../services/users';

//Styles
import './login.css'


const Login = () => {

    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const navigate = useNavigate();
    const { setMessage } = useMessage();

    useEffect(() => {
        authUser()
        .then(() => {
            navigate('/');
        })
        .catch((e) => {
            setLoadingPage(false);
        })
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        const {email, password} = Object.fromEntries(new FormData(e.target));
        setLoadingButton(true);
        loginUser({email, password})
        .then((token) => {
            localStorage.setItem('userToken',token);
            navigate('/')
        })
        .catch((e) => {
            setMessage({ message: e, type : 'error' });
            setLoadingButton(false)
        })
    }


    return (
        <>
            <Isotipo className='background-isotipo' fill='var(--lightBlue)' />
            { loadingPage ? <LoadingPage /> :
            <div className='container'>
                <img src={logo} alt="Radio Eter Mdp" className='logo' />
                <form className='loginForm' onSubmit={handlerSubmit}>
                    <CustomInput focus={true} placeholder="Mail" type="email" name="email"/>
                    <CustomInput placeholder="Contraseña" type="password" name="password"/>
                    <button type='submit' className={`primaryBtn${loadingButton ? ' loadingBtn' : ''}`} disabled={loadingButton} >Login</button>
                </form>
            </div>
            }
        </>
       
    )
}

export default Login;