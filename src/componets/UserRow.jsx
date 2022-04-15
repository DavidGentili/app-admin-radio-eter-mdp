import React from 'react'

import edit from '../../assets/edit.png'


const UserRow = ({ user , openModal}) => {
  return (
    <tr key={user.id}>
        <th>{user.name}</th>
        <th>{user.email}</th>
        <th>{user.securityLevel}</th>
        <th>{user.state}</th>
        <th><button onClick={openModal}><img src={edit} alt="Editar" /></button></th>
    </tr>
  )
}

export default UserRow