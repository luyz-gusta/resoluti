/**************************************************************************************
 *  Goal: Page Create Person
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import Header from "../../components/Header";
import SubTitle from "../../components/Subtitle";
import '../../css/create-person.css'
import SectionTitle from "../../components/SectionTitle";
import InputLabel from "../../components/InputLabel";
import InputDate from "../../components/InputDate";
import InputCPF from "../../components/InputCPF";
import InputRG from "../../components/InputRG";
import { useEffect, useState } from "react";
import AddressForm from "../../components/AddressForm";
import ButtonForm from "../../components/ButtonForm";
import ContactForm from "../../components/ContactForm";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../Service";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const CreatePerson = () => {
    const [counter, setCounter] = useState(0)
    const [component, setComponent] = useState([{
        id: counter,
        cep: '',
        logradouro: '',
        cidade: '',
        estado: '',
        numero: '',
        complemento: ''
    }]);

    const [counterContact, setCounterContact] = useState(0)
    const [componentContact, setComponentContact] = useState([{
        id: '',
        nome: '',
        contato: '',
        id_tipo_contato: ''
    }]);
    const [listAddress, setListAddress] = useState([])
    const [listContact, setListContact] = useState([])
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const navigate = useNavigate()
    const { session } = useParams()
    const [activeInput, setActiveInput] = useState(true)


    const addAddress = () => {
        const index = counter + 1
        setCounter(index)
        setComponent((prevComponent) => [...prevComponent, {
            id: index,
            cep: '',
            logradouro: '',
            cidade: '',
            estado: '',
            numero: '',
            complemento: ''
        }]);
    };

    const removeAddress = (index) => {
        console.log(index);
        if (component.length > 1) {
            setComponent((prevComponent) => prevComponent.filter((i) => i.id != index));
            setListAddress((prevAddress) => prevAddress.filter((i) => i.id != index));
        }
        console.log(component);
    };

    const addContact = () => {
        const index = counterContact + 1
        setCounterContact(index)
        setComponentContact((prevComponent) => [...prevComponent, {
            id: index,
            nome: '',
            contato: '',
            id_tipo_contato: ''
        }]);
    };

    const removeContact = (index) => {
        if (componentContact.length > 1) {
            setComponentContact((prevComponent) => prevComponent.filter((i) => i.id != index));
            setListContact((prevConsetListContact) => prevConsetListContact.filter((i) => i.id != index));
        }
    };

    const exit = () => {
        sessionStorage.removeItem('idUser')
        navigate('/')
    }

    useEffect(() => {
        const idUser = sessionStorage.getItem('idUser')
        const sessionStart = sessionStorage.getItem('session')

        if (!idUser) {
            Swal.fire({
                title: "Para acessar o sistema tem que estar logado",
                icon: "info",
            }).then(result => {
                if (result) {
                    navigate('/')
                }
            })
        } else {
            if (session == "view") {
                setActiveInput(true)
                const idPersonView = sessionStorage.getItem('idPerson')

                axios.get(`${baseUrl}/v1/person/${idPersonView}`)
                    .then(response => {
                        const personalData = response.data.data.personal_data
                        const addressData = response.data.data.address
                        const contactsData = response.data.data.contacts

                        setNome(personalData.nome)
                        setSobrenome(personalData.sobrenome)
                        setDataNascimento(personalData.data_nascimento)
                        setEmail(personalData.email)
                        setCpf(personalData.cpf)
                        setRg(personalData.rg)

                        setComponent([])
                        setComponent(addressData)

                        setComponentContact([])
                        setComponentContact(contactsData)

                    }).catch(error => {
                        Swal.fire({
                            title: "Sistema fora do ar, tente novamente mais tarde",
                            icon: "info"
                        })
                    })

            } else if (session == 'edit') {
                setActiveInput(false)
                const idPersonView = sessionStorage.getItem('idPerson')

                axios.get(`${baseUrl}/v1/person/${idPersonView}`)
                    .then(response => {
                        const personalData = response.data.data.personal_data
                        const addressData = response.data.data.address
                        const contactsData = response.data.data.contacts

                        setNome(personalData.nome)
                        setSobrenome(personalData.sobrenome)
                        setDataNascimento(personalData.data_nascimento)
                        setEmail(personalData.email)
                        setCpf(personalData.cpf)
                        setRg(personalData.rg)

                        setComponent([])
                        setComponent(addressData)
                        setListAddress(addressData)

                        setComponentContact([])
                        setComponentContact(contactsData)
                        setListContact(contactsData)

                    }).catch(error => {
                        Swal.fire({
                            title: "Sistema fora do ar, tente novamente mais tarde",
                            icon: "info"
                        })
                    })
            } else {
                setActiveInput(false)
            }
        }
    }, [])

    const handleCreatePerson = () => {
        const idUser = sessionStorage.getItem('idUser')

        Swal.showLoading()
        if (
            nome.length < 1 || nome == '' ||
            sobrenome.length < 1 || sobrenome == '' ||
            dataNascimento.length < 1 || dataNascimento == '' ||
            email.length < 1 || email == '' ||
            cpf.length < 1 || cpf == '' ||
            rg.length < 1 || rg == '' ||
            listAddress.length < 1 || listContact.length < 1
        ) {
            Swal.fire({
                title: "Informação",
                text: "Não foram preenchidos todos os campos obrigátórios",
                icon: "info"
            })
        } else if (nome.length > 50) {
            Swal.fire({
                title: "Nome",
                text: "Foi ultrapassado o número de caracteres limite do nome",
                icon: "info"
            })
        } else if (sobrenome.length > 50) {
            Swal.fire({
                title: "Sobrenome",
                text: "Foi ultrapassado o número de caracteres limite do sobrenome",
                icon: "info"
            })
        } else if (email.length > 255) {
            Swal.fire({
                title: "Email",
                text: "Foi ultrapassado o número de caracteres limite do email",
                icon: "info"
            })
        } else if (cpf.length > 14) {
            Swal.fire({
                title: "CPF",
                text: "Foi ultrapassado o número de caracteres limite do cpf",
                icon: "info"
            })
        } else if (rg.length > 15) {
            Swal.fire({
                title: "RG",
                text: "Foi ultrapassado o número de caracteres limite do rg",
                icon: "info"
            })
        } else {
            const dataJson = {
                id_usuario: idUser,
                personal_data: {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    data_nascimento: dataNascimento,
                    cpf: cpf,
                    rg: rg,
                    id_usuario: idUser
                },
                address: listAddress,
                contacts: listContact
            }
            console.log(dataJson);

            axios.post(`${baseUrl}/v1/person`, dataJson, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.data || response.data == undefined) {
                        Swal.fire({
                            title: 'Servidor está fora do ar, tente novamente mais tarde!',
                            icon: "error"
                        });
                    } else {
                        if (response.data.status === 201) {
                            Swal.fire({
                                title: "Pessoa física criada com sucesso",
                                icon: "success"
                            });
                            navigate("/people")
                        }
                    }
                })
                .catch(error => {
                    console.log(error);

                    if (error.code == "ERR_NETWORK") {
                        Swal.fire({
                            title: 'Servidor está fora do ar, tente novamente mais tarde!',
                            icon: "error"
                        });
                    } else if (error.response.data || error.response.data != undefined) {
                        const errorJson = error.response.data

                        if (errorJson.status === 400) {
                            Swal.fire({
                                title: `${errorJson.message}`,
                                icon: "error"
                            });
                        } else if (errorJson.status === 503) {
                            Swal.fire({
                                title: `${errorJson.message}`,
                                icon: "error"
                            });
                        } else if (errorJson.status === 404) {
                            Swal.fire({
                                title: 'Erro, seu usuário não encontrado, faça login novamente!',
                                icon: "error"
                            });
                        }
                    } else {
                        Swal.fire({
                            title: 'Servidor está fora do ar, tente novamente mais tarde!',
                            icon: "error"
                        });
                    }

                })
                .finally(() => {
                    Swal.hideLoading()
                })
        }
    }

    const handleUpdatePerson = () => {
        console.log('bateu');
        const idUser = sessionStorage.getItem('idUser')
        const idPersonEdit = sessionStorage.getItem('idPerson')

        Swal.showLoading()
        console.log(listAddress);
        if (
            nome.length < 1 || nome == '' ||
            sobrenome.length < 1 || sobrenome == '' ||
            dataNascimento.length < 1 || dataNascimento == '' ||
            email.length < 1 || email == '' ||
            cpf.length < 1 || cpf == '' ||
            rg.length < 1 || rg == '' ||
            listAddress.length < 1 || listContact.length < 1
        ) {
            Swal.fire({
                title: "Informação",
                text: "Não foram preenchidos todos os campos obrigátórios",
                icon: "info"
            })
        } else if (nome.length > 50) {
            Swal.fire({
                title: "Nome",
                text: "Foi ultrapassado o número de caracteres limite do nome",
                icon: "info"
            })
        } else if (sobrenome.length > 50) {
            Swal.fire({
                title: "Sobrenome",
                text: "Foi ultrapassado o número de caracteres limite do sobrenome",
                icon: "info"
            })
        } else if (email.length > 255) {
            Swal.fire({
                title: "Email",
                text: "Foi ultrapassado o número de caracteres limite do email",
                icon: "info"
            })
        } else if (cpf.length > 14) {
            Swal.fire({
                title: "CPF",
                text: "Foi ultrapassado o número de caracteres limite do cpf",
                icon: "info"
            })
        } else if (rg.length > 15) {
            Swal.fire({
                title: "RG",
                text: "Foi ultrapassado o número de caracteres limite do rg",
                icon: "info"
            })
        } else {
            const dataJson = {
                personal_data: {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    data_nascimento: dataNascimento,
                    cpf: cpf,
                    rg: rg,
                    id_usuario: idUser
                },
                address: listAddress,
                contacts: listContact
            }

            axios.put(`${baseUrl}/v1/person/${idPersonEdit}`, dataJson, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.data || response.data == undefined) {
                        Swal.fire({
                            title: 'Servidor está fora do ar, tente novamente mais tarde!',
                            icon: "error"
                        });
                    } else {
                        if (response.data.status === 200) {
                            Swal.fire({
                                title: "Pessoa física atualizada com sucesso",
                                icon: "success"
                            });
                            navigate("/people")
                        }
                    }
                })
                .catch(error => {
                    console.log(error);

                    if (error.code == "ERR_NETWORK") {
                        Swal.fire({
                            title: 'Servidor está fora do ar, tente novamente mais tarde!',
                            icon: "error"
                        });
                    } else if (error.response.data || error.response.data != undefined) {
                        const errorJson = error.response.data

                        if (errorJson.status === 400) {
                            Swal.fire({
                                title: `${errorJson.message}`,
                                icon: "error"
                            });
                        } else if (errorJson.status === 503) {
                            Swal.fire({
                                title: `${errorJson.message}`,
                                icon: "error"
                            });
                        } else if (errorJson.status === 404) {
                            Swal.fire({
                                title: 'Erro, seu usuário não encontrado, faça login novamente!',
                                icon: "error"
                            });
                        }
                    } else {
                        Swal.fire({
                            title: 'Servidor está fora do ar, tente novamente mais tarde!',
                            icon: "error"
                        });
                    }

                })
                .finally(() => {
                    Swal.hideLoading()
                })
        }
    }

    return (
        <div className="create-person">
            <Header onClick={exit} />
            <div className="btn-back" onClick={() => navigate('/people')}>
                <FaArrowAltCircleLeft />
                <p>Voltar</p>
            </div>
            <form className="container-create-person">
                <SubTitle subtitle="Cadastrar Pessoa Física" />
                <section className="sec-personal-data">
                    <SectionTitle title="Dados Pessoais" />
                    <div className="box-inputs">
                        <InputLabel
                            forLabel="nome"
                            label="Nome"
                            placeholder="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            disable={activeInput}
                        />
                        <InputLabel
                            forLabel="sobrenome"
                            label="Sobrenome"
                            placeholder="sobrenome"
                            type="text"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                            disable={activeInput}
                        />
                        <InputDate
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            disable={activeInput}
                        />
                        <InputLabel
                            forLabel="email"
                            label="Email"
                            placeholder="email@email.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disable={activeInput}
                        />
                        <InputCPF
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            disable={activeInput}
                        />
                        <InputRG
                            value={rg}
                            onChange={(e) => setRg(e.target.value)}
                            disable={activeInput}
                        />
                    </div>
                    <div className="line"></div>
                </section>
                <section className="sec-address">
                    <div className="title-form">
                        <SectionTitle title="Endereços" />
                        <ButtonForm
                            txt="Adicionar Endereço"
                            onclick={() => {
                                if (session == "view") {

                                } else if (session == "edit") {
                                    addAddress()
                                } else {
                                    addAddress()
                                }
                            }}
                        />
                    </div>
                    {component.map((local) => (
                        
                        <AddressForm dados={local} disable={activeInput} key={local.id} onclickbtn={() => {
                            if (session == "view") {
                                
                            } else if (session == "edit") {
                                removeAddress(local.id)
                            } else {
                                removeAddress(local.id)
                            }
                        }} onChangeDataJson={(data) => {
                            //Se inicia assim que todos os inputs estão preenchidos(exceto complemento)
                            if (Object.keys(data).length > 3) { //Vericia quantas chaves tem o json por causa que vinha um json vazio
                                data.id = local.id //Adiciona um atributo chave o json
                                if (listAddress.length > 0) { //Verifica sem tem algum json na listAddressa
                                    let findObject = listAddress.find(address => address.id === local.id) // Vê se já tem um cópia do json pela chave identificadora adicionada como id

                                    console.log(data);
                                    if (findObject) {
                                        Object.assign(findObject, data); //Se tiver um cópia ele substitui
                                    } else {
                                        setListAddress([...listAddress, data]) //Se não tiver ele adiciona o json no array
                                    }
                                } else {
                                    setListAddress([...listAddress, data]) //E se não tiver nenhum json no array, é adicionado o primeiro
                                }
                            }
                        }} />
                    ))}
                    <div className="line"></div>
                </section>
                <section className="sec-contact">
                    <div className="title-form">
                        <SectionTitle title="Contatos" />
                        <ButtonForm
                            txt="Adicionar Contato"
                            onclick={() => {
                                if (session == "view") {

                                } else if (session == "edit") {
                                    addContact()
                                } else {
                                    addContact()
                                }
                            }}
                        />
                    </div>
                    {componentContact.map((local) => (
                        <ContactForm key={local.id} dados={local} disable={activeInput} onclickbtn={() => {
                            if (session == "view") {

                            } else if (session == "edit") {
                                console.log('aqui');
                                removeContact(local.id)
                            } else {
                                removeContact(local.id)
                            }
                        }} onChangeDataJson={(data) => {
                            data.id = local.id
                            if (listContact.length > 0) {
                                let findObject = listContact.find(contact => contact.id === local.id)

                                if (findObject) {
                                    Object.assign(findObject, data)
                                } else {
                                    console.log(listContact);
                                    setListContact([...listContact, data])
                                }
                            } else {
                                setListContact([...listContact, data])
                            }
                        }} />
                    ))}
                    <div className="line"></div>
                </section>
                <div className="btn-save">
                    <ButtonForm txt="Salvar" onclick={() => {
                        if (session == "create") {
                            handleCreatePerson()
                        } else if (session == "edit") {
                            handleUpdatePerson()
                        }
                    }} />
                </div>
            </form>
        </div>
    );
}

export default CreatePerson;