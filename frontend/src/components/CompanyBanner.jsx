/**************************************************************************************
 *  Goal: Company Banner(Login e Register User) 
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/

const CompanyBanner = () => {
    return (
        <section className="company">
            <img src={require('../assets/big-resoluti-logo.png')} alt="Logo da empresa" className='big-logo'/>
            <img src={require('../assets/img-programmer.png')} alt="Imagem de um programador" className='pic-programmer'/>
        </section>  
    )
}

export default CompanyBanner