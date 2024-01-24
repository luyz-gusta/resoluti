/**************************************************************************************
 *  Goal: Input(CPF) 
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import ReactInputMask from "react-input-mask"

const InputCPF = ({value, onChange,disable}) => {
    return (
        <div class="input-label">
            <ReactInputMask
                mask="999.999.999-99"
                maskChar={null}
                type="text" 
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                value={value}
                onChange={onChange}
                disabled = {disable}
            />
            <label htmlFor="cpf">CPF</label>
        </div>
    )
}

export default InputCPF