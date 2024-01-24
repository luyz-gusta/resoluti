/**************************************************************************************
 *  Goal: Page Login
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/

import Input from '../../components/Input';
import Title from '../../components/Title';
//import { AiOutlineLock } from "react-icons/ai";
import '../../css/login.css'
import '../../css/input.css'
import InputPassword from '../../components/InputPassword';
import AcessButon from '../../components/AccessButton';
import AccessLink from '../../components/AccessLink';
import CompanyBanner from '../../components/CompanyBanner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Service';
import axios from 'axios';
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        const dataJson = {
            email: email,
            senha: password
        }

        if (dataJson.email === '' || dataJson.senha === '') {
            Swal.fire({
                title: "Informação",
                text: "Não foram preenchidos todos os campos obrigátórios",
                icon: "info"
            })
        } else {
            axios.post(`${baseUrl}/v1/user/login`, dataJson, {
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {
                const user = response.data.data[0]

                if (response.data.status === 200) {
                    sessionStorage.setItem('idUser', user.id)
                    navigate("/people")
                }
            }).catch(error => {
                if (error.code == "ERR_NETWORK") {
                    Swal.fire({
                        title: 'Servidor está fora do ar, tente novamente mais tarde!',
                        icon: "error"
                    });
                } else {
                    const errorJson = error.response.data

                    if (errorJson.status === 404) {
                        Swal.fire({
                            title: "Email ou senha incorreto",
                            icon: "error"
                        });
                    }
                }
            })
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    };

    return (
        <div className="login">
            <section className="form-container">
                <div className="form-login">
                    <Title title="Login" />
                    <form className='form-container' id='form-login' onKeyDown={handleKeyPress}>
                        <div className="group-inputs">
                            <Input
                                icon={true}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputPassword
                                margin={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <AccessLink
                                txtBasic="Ainda não tem conta?"
                                txtLink="Cadastre-se aqui"
                                route='/registeruser'
                            />
                        </div>
                        <AcessButon
                            txt="Entrar"
                            onClick={handleLogin}
                        />

                    </form>
                </div>
            </section>
            <CompanyBanner />
        </div>
    );
}

export default Login;