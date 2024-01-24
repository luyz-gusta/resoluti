/**************************************************************************************
 *  Goal: Input(Email, Username) 
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/
import '../css/input.css'
import { FaRegEnvelope, FaRegUser } from "react-icons/fa";

const Input = ({ icon, type, placeholder, value, onChange }) => {
    let iconComponent
    if (icon) {
        iconComponent = <FaRegEnvelope />
    } else {
        iconComponent = <FaRegUser />
    }

    return (
        <div class="group">
            <span className='icon'>
                {iconComponent}
            </span>
            <input class="input" value={value} onChange={onChange} type={type} placeholder={placeholder} />
        </div>
    )
}

export default Input