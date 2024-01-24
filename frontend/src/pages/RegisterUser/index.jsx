/**************************************************************************************
 *  Goal: Page Register User
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/
import '../../css/input.css'
import '../../css/input-file.css'
import '../../css/register-user.css'
import CompanyBanner from '../../components/CompanyBanner';
import Title from '../../components/Title';
import InputPassword from '../../components/InputPassword';
import Input from '../../components/Input';
import InputPhone from '../../components/InputPhone';
import UploadPhotoUser from '../../components/Upload';
import AccessLink from '../../components/AccessLink';
import AccessButton from '../../components/AccessButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl } from '../../Service';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../adapters/firebase';

const RegisterUser = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [picture] = useState('')
    const [file, setFile] = useState('')
    const navigate = useNavigate()

    const handleRegisterUser = (urlPicture) => {
        const dataJson = {
            username: username,
            email: email,
            telefone: phone,
            senha: password,
            imagem: urlPicture
        }

        if (
            dataJson.email === '' || dataJson.senha === '' ||
            dataJson.telefone === '' || dataJson.username === ''
        ) {
            Swal.fire({
                title: "Informação",
                text: "Não foram preenchidos todos os campos obrigátórios",
                icon: "info"
            })
        } else {
            axios.post(`${baseUrl}/v1/user`, dataJson, {
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {
                if (response.data.status === 201) {
                    navigate("/")
                }
            }).catch(error => {
                if (error.code == "ERR_NETWORK") {
                    Swal.fire({
                        title: 'Servidor está fora do ar, tente novamente mais tarde!',
                        icon: "error"
                    });
                } else {
                    const errorJson = error.response.data

                    if (errorJson.status === 409) {
                        Swal.fire({
                            title: `${errorJson.message}`,
                            icon: "error"
                        });
                    } else if (errorJson.status === 500) {
                        Swal.fire({
                            title: `${errorJson.message}`,
                            icon: "error"
                        });
                    }
                }
            }).finally(() => {
                Swal.hideLoading()
            })
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleUpload()
        }
    };

    const handleUpload = (event) => {
        if (file === '') {
            Swal.fire({
                title: "Informação",
                text: "Não foram preenchidos todos os campos obrigátórios",
                icon: "info"
            })
        } else {
            const storageRef = ref(storage, `images/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                "state_changed",
                snapshot => {
                    Swal.showLoading()
                },
                error => {
                    Swal.fire({
                        title: "ERRO",
                        text: "Erro no upload da imagem",
                        icon: "error"
                    })
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        handleRegisterUser(url)
                    })
                }
            )
        }
    }

    return (
        <div className="register-user">
            <CompanyBanner />
            <section className='register-user-container'>
                <form className="form-register-user" onKeyDown={handleKeyPress}>
                    <Title title="Cadastro" />
                    <UploadPhotoUser
                        value={picture}
                        onChange={(e) => setFile(e)}
                    />
                    <div className="form-container-register">
                        <Input
                            icon={false}
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Input
                            icon={true}
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputPhone
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <InputPassword
                            margin={false}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <AccessLink
                            route="/"
                            txtBasic="Já tem conta?"
                            txtLink="Acesse-se aqui"
                        />
                    </div>
                    <AccessButton
                        txt="Criar"
                        onClick={handleUpload}
                    />
                </form>
            </section>
        </div>
    );
}

export default RegisterUser;