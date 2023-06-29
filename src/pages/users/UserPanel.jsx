import React from 'react'

import SingleUser from '../../componets/singleComponents/SingleUser';
import ListPane from '../../componets/generalComponents/ListPane';

const UserPanel = ({ users, selectUser, setUsers }) => {

    const sortUser = (key) => {
        const sortArray = [...users]
        sortArray.sort(function(a ,b ){
            return (a[key] <= b[key]) ? -1 : 1
        })
        setUsers(sortArray);
    }

    const singles = users.map((user) => <SingleUser key={user.id} user={user} selectUser={selectUser(user)} />);

    const headers = [
        {
            command : 'name',
            field : 'Usuario',
        },
        {
            command : 'email',
            field : 'Mail',
        },
        {
            command : 'securityLevel',
            field : 'Nivel de Seguridad',
        },
        {
            command : 'state',
            field : 'Estado',
        },
    ]


    return <ListPane {...{headers, elements : singles, sortAction : sortUser}} />
}

export default UserPanel