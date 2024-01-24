/**************************************************************************************
 *  Goal: Title 
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/


const Title = ({title}) => {
    return(
        <div className="title">
            <img src={require('../assets/small-resoluti-logo.png')} alt="Logo pequena da resoluti" className='small-logo'/>
            <h1>{title}</h1>
        </div>
    )
}

export default Title