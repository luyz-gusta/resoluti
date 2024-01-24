/**************************************************************************************
 *  Goal: Input(RG) 
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import ReactInputMask from "react-input-mask"

const InputRG = ({value, onChange, disable}) => {
    return (
        <div class="input-label">
            <ReactInputMask
                mask="99.999.999-9"
                maskChar={null} 
                type="text" 
                id="rg"
                name="rg"
                placeholder="00.000.000-0"
                value={value}
                onChange={onChange}
                disabled={disable}
            />
            <label htmlFor="rg">RG</label>
        </div>
    )
}

export default InputRG