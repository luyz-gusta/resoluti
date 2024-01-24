/**************************************************************************************
 *  Goal: Button(Nova Pessoa)
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const ButtonLink = ({onClick}) => {

    return (
        <button onClick={onClick} className="btn">
            <strong>Nova Pessoa</strong>
            <FaPlus />
        </button>
    );
}

export default ButtonLink;