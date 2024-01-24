/**************************************************************************************
 *  Goal: Input(Nome, Sobrenome, Email, Complemento, Logradouro) 
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/
import '../css/create-person.css'

const InputLabel = ({ type, label, placeholder, forLabel, disable, value, onChange }) => {
    return (
        <div class="input-label">
            {disable ? <input id={forLabel} value={value} onChange={onChange} type={type} placeholder={placeholder} disabled={true}/>
            :<input id={forLabel} value={value} onChange={onChange} type={type} placeholder={placeholder} disabled={false}/>}
            <label htmlFor={forLabel}>{label}</label>
        </div>
    )
}

export default InputLabel