/**************************************************************************************
 *  Goal: Header
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
**************************************************************************************/
import { BiExit } from "react-icons/bi";

const Header = ({ onClick }) => {
    return (
        <header>
            <button type='button' onClick={onClick} className="exit">
                <BiExit />
                <span>Sair</span>
            </button>
            <img src={require('../assets/big-resoluti-logo.png')} alt="logo grande da resoluti" />
        </header>
    );
}

export default Header;