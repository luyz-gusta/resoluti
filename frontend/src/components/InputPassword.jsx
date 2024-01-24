/**************************************************************************************
 *  Goal: Input password
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/
import { useState } from 'react';
import '../css/input.css'
import { AiOutlineLock } from "react-icons/ai";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputPassword = ({margin, value, onChange }) => {
    const [visible, setVisible] = useState(false)
    const [type, setType] = useState('password')

    const changeVisible = () => {
        if (visible) {
            setType('password')
            setVisible(false)
        } else {
            setType('text')
            setVisible(true)
        }
    }
    let style

    if(margin){
        style = {
            marginTop: '20px'
        }
    }else{
        style = {}
    }

    return (
        <div class="group" style={style}>
            <span className='icon'>
                <AiOutlineLock />
            </span>
            <input class="input" type={type} placeholder="Password" value={value} onChange={onChange} />
            <span className='icon-password'>
                {visible ? <FaEye onClick={changeVisible} /> : <FaEyeSlash onClick={changeVisible} />}
            </span>
        </div>
    )
}

export default InputPassword