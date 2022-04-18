import React from 'react'

import useUser from '../../hooks/useUser'

import './myUser.css'

const MyUser = () => {

    const localUser = useUser();

    return (
        <main className='myUserMain'>
            { localUser ?
                <><section className='myUserInformation'>
                    <h3>Datos</h3>
                    <h4>Usuario: <span>{localUser.name}</span></h4>
                    <h5>Nivel: <span>{localUser.securityLevel}</span></h5>
                    <h4>Mail: <span>{localUser.email}</span></h4>
                    <h5>Estado: <span>{localUser.state}</span></h5>
                </section>

                <section className='myUserForm'>
                    <h3>Cambiar Contraseña</h3>
                    <form >
                        <input type="password" name='currentPassword' placeholder='Contraseña actual'/>
                        <input type="password" name='newPassword' placeholder='Nueva contraseña'/>
                        <input type="password" name='confirmPassword' placeholder='Confirmar contraseña'/>
                        <button type='submit'>Cambiar contraseña</button>
                    </form>
                </section></>
                :
                <h1>opps, ¡sorry! we had a server error</h1>
            }
        </main>
    )
}

export default MyUser