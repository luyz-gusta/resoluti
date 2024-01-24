/**************************************************************************************
 *  Goal: Acess Button(Login e Register User) 
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/

const AccessButton = ({txt, onClick}) => {
    return(
        <button type="button" onClick={onClick} className='btn-enter'>{txt}</button>
    )
}

export default AccessButton