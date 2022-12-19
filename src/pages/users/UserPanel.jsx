import React from 'react'
import { useNavigate } from 'react-router-dom';

import SingleUser from '../../componets/singleComponents/SingleUser';
import CustomButton from '../../componets/generalComponents/CustomButton'
import { ChevronIcon } from '../../componets/Icons'

const UserPanel = ({ users, selectUser, setUsers }) => {

    const navigate = useNavigate();

    const sortUser = (key) => {
        const sortArray = [...users]
        sortArray.sort(function(a ,b ){
            return (a[key] <= b[key]) ? -1 : 1
        })
        setUsers(sortArray);
    }

    const navigateToNewUser = (e) => {
        e.preventDefault();
        navigate('./nuevo');
    }

    return (
        <>
            <section className='userPanel'>
                <div className="headerPanel">
                    <button onClick={(e) => {sortUser('name')}}>Usuario <ChevronIcon/> </button>
                    <button onClick={(e) => {sortUser('email')}}>Mail <ChevronIcon/></button>
                    <button onClick={(e) => {sortUser('securityLevel')}}>Nivel de seguridad <ChevronIcon/></button>
                    <button onClick={(e) => {sortUser('state')}}>Estado <ChevronIcon/></button>
                    <p>Acciones</p>
                </div>
                {
                    users.length === 0 ? <p>No hay usuarios</p>
                    :
                    users.map((user) => <SingleUser key={user.id} user={user} selectUser={selectUser(user)} />)
                }
            </section>
            <CustomButton type='primary' text='+' onClickEvent={navigateToNewUser} />
        </>
    )
    }

export default UserPanel