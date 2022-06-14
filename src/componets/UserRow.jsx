import React from 'react'

import { EditIcon } from './Icons';


const UserRow = ({ user , selectUser}) => {
  return (
    <div className='userRow' key={user.id}>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.securityLevel}</p>
        <p>{user.state}</p>
        <button onClick={selectUser}> <EditIcon /> </button>
    </div>
  )
}

export default UserRow