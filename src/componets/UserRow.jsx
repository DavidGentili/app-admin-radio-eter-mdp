import React from 'react'

import { EditIcon } from './Icons';


const UserRow = ({ user , openModal}) => {
  return (
    <tr key={user.id}>
        <th>{user.name}</th>
        <th>{user.email}</th>
        <th>{user.securityLevel}</th>
        <th>{user.state}</th>
        <th><button onClick={openModal}> <EditIcon /> </button></th>
    </tr>
  )
}

export default UserRow