/**************************************************************************************
 *  Goal: Input(Data) 
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import ReactInputMask from "react-input-mask"

const InputDate = ({value, onChange, disable}) => {
    return (
        <div class="input-label">
            <ReactInputMask
                mask="99/99/9999"
                maskChar={null}
                type="text" 
                id="date"
                name="date"
                placeholder="DD/MM/AAAA"
                value={value}
                onChange={onChange}
                disabled = {disable}
            />
            <label htmlFor="date">Data de nascimento</label>
        </div>
    )
}

export default InputDate