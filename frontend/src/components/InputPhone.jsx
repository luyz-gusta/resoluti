/**************************************************************************************
 *  Goal: Input phone
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/
import '../css/input.css'
import { FaPhoneAlt } from 'react-icons/fa';
import ReactInputMask from 'react-input-mask';

const InputPhone = ({ disableIcon, label, value, onChange, disable }) => {
    return (
        <>
            {disableIcon ?
                <div class="input-label">
                    <ReactInputMask
                        className="input input-phone"
                        mask="(99) 99999-9999"
                        maskChar={null}
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Telefone"
                        value={value}
                        onChange={onChange}
                        disabled ={disable}
                    />
                </div> :
                <div class="group">
                    <span className='icon'>
                        <FaPhoneAlt />
                    </span>
                    <ReactInputMask
                        className="input input-phone"
                        mask="(99) 99999-9999"
                        maskChar={null}
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Telefone"
                        value={value}
                        onChange={onChange}
                    />
                </div>
            }
        </>
    )
}

export default InputPhone