/**************************************************************************************
 *  Goal: Input(CEP) 
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import ReactInputMask from "react-input-mask"

const InputCEP = ({ value, onChange, disable }) => {
    return (
        <div class="input-label">
            <ReactInputMask
                mask="99999-999"
                maskChar={null}
                type="text"
                id="cep"
                name="cep"
                placeholder="00000-000"
                value={value}
                onChange={onChange}
                disabled={disable}
            />
            <label htmlFor="cep">CEP</label>
        </div>
    )
}

export default InputCEP