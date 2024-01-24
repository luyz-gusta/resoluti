/**************************************************************************************
 *  Goal: Contact Form
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { useEffect, useState } from "react";
import ButtonForm from "./ButtonForm";
import InputDropdown from "./InputDropdown";
import InputLabel from "./InputLabel";
import InputPhone from "./InputPhone";
import { baseUrl } from "../Service";
import axios from "axios";

const ContactForm = ({ onclickbtn, onChangeDataJson, disable, dados }) => {
    const [selectedOption, setSelectedOption] = useState(dados.id_tipo_contato)
    const [options, setOptions] = useState([])
    const [contato, setContato] = useState(dados.contato)
    const [nome, setNome] = useState(dados.nome)
    let component

    if (selectedOption == '') {
        component = <InputLabel
            forLabel="contato"
            placeholder="Email/Telefone - selecione"
            label="Contato"
            type="text"
            value={contato}
            onChange={(e) => {
                setContato('')
                setContato(e.target.value)
            }}
            disable={true}
        />
    } else if (selectedOption == '1') {
        component = <InputLabel
            forLabel="email"
            placeholder="email@email.com"
            label="Contato"
            value={contato}
            onChange={(e) => {
                setContato('')
                setContato(e.target.value)
            }}
            type="email"
            disable={disable}
        />
    } else {
        component = <div class="input-label">
            <InputPhone
                value={contato}
                onChange={(e) => {
                    setContato('')
                    setContato(e.target.value)
                }}
                disableIcon={true}
                disable={disable}
            />
            <label htmlFor="phone">Contato</label>
        </div>
    }

    const handleSelect = (value) => {
        setSelectedOption(value);
    };

    useEffect(() => {

        if (
            nome.length > 2 && contato.length > 0 && selectedOption != ''
        ) {

            onChangeDataJson({
                nome: nome,
                contato: contato,
                id_tipo_contato: selectedOption
            })
        }

    }, [nome, contato, selectedOption]);

    useEffect(() => {
        axios.get(`${baseUrl}/v1/contact-type`).then(response => {
            const res = response.data
            const listOption = []

            res.data.map(option => {
                const json = {
                    value: option.id,
                    label: option.tipo
                }

                listOption.push(json)
            })

            setOptions(listOption)
        }).catch(error => {
            console.log(error)
        })
    }, []);

    return (
        <div className="contact-form">
            <div className="box-inputs">
                <InputLabel
                    forLabel="nome-contato"
                    placeholder="Nome contato"
                    label="Nome"
                    type="text"
                    value={nome}
                    disable={disable}
                    onChange={(e) => setNome(e.target.value)}
                />
                {component}
                <InputDropdown
                    forLabel="dropdown"
                    label="Tipo de Contato"
                    onSelect={handleSelect}
                    optionTxt="Tipo de Contato"
                    options={options}
                    selectedOption={selectedOption}
                    disable={disable}
                />
            </div>
            <ButtonForm
                txt="Remover"
                onclick={onclickbtn}
            />
        </div>
    );
}

export default ContactForm;