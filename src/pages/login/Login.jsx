import { React } from 'react';

import Isotipo from '../../componets/general/Isotipo'
import logo from '../../../assets/logo.png'

import './login.css'

const Login = () => {


    return (
        <>
            <Isotipo className='background-isotipo' fill='var(--lightBlue)' />
            <div className='container'>
                <img src={logo} alt="Radio Eter Mdp" className='logo' />
                <form>
                    <input type="email" placeholder='Email' name='email'/>
                    <input type="password" placeholder='Password' name='password'/>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </>
       
    )
}

export default Login;