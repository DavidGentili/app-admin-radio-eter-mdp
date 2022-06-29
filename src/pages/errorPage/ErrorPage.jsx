import React from 'react';
import { Link } from 'react-router-dom'
 
import errorPageImg from '../../../assets/error-page-img.png'

import './errorPage.css'

const ErrorPage = (props) => {
  return (
    <main className='errorPage'>
        <img src={errorPageImg} loading='lazy' alt="error"/>
        <h2>Ha ocurrido un error</h2>
        <h3>Esta ruta no esta disponible, la misma se encuentra fuera de servicio o es invalida.</h3>
        <Link to='/' >Volver al panel de principal</Link>
    </main>
  )
}

export default ErrorPage