/**************************************************************************************
 *  Goal: Input Dropdown
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

const InputDropdown = ({ disable, options, selectedOption, onSelect, forLabel, label, optionTxt }) => {
    return (
        <div class="input-label">
            <select
                id="dropdown"
                name="dropdown"
                value={selectedOption}
                onChange={(e) => onSelect(e.target.value)}
                className="dropdown-field"
                disabled = {disable}
            >
                <option value="">{optionTxt}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label htmlFor={forLabel}>{label}</label>
        </div>
    )
}

export default InputDropdown