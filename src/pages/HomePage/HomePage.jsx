import { React } from 'react'
import { Link } from 'react-router-dom'

//Styles
import './homePage.css'

const HomePage = ({menuOptions}) => {
    return (
        <main className='homePage'>
            <h2>Bienvenido al panel principal</h2>
            <div className="options">{ 
                menuOptions.map(({goTo, Icon, text}) => {
                    return (<Link key={goTo} to={goTo}>
                        <Icon />
                        <h4>{text}</h4>
                    </Link>)
                })
            }</div>
        </main>
    )
}

export default HomePage;