/**************************************************************************************
 *  Goal: Acess Link(Login e Register User) 
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { Link } from "react-router-dom"


const AccessLink = ({ txtBasic, txtLink, route }) => {
    return (
        <span className="no-count">{txtBasic} <Link to={route} className='txt-register'>{txtLink}</Link> </span>
    )
}

export default AccessLink