/**************************************************************************************
 *  Goal: Address Form
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { useEffect, useState } from "react";
import ButtonForm from "./ButtonForm";
import InputCEP from "./InputCEP";
import InputLabel from "./InputLabel";
import axios from "axios";
import Swal from "sweetalert2";

const AddressForm = ({ onclickbtn, onChangeDataJson, disable, dados }) => {
    const [cep, setCep] = useState(dados.cep)
    const [logradouro, setLogradouro] = useState(dados.logradouro)
    const [cidade, setCidade] = useState(dados.cidade)
    const [estado, setEstado] = useState(dados.estado)
    const [numero, setNumero] = useState(dados.numero)
    const [complemento, setComplemento] = useState(dados.complemento)

    useEffect(() => {
        if (cep.length == 9) {
            const cepValue = cep.replace("-", "")

            axios.get(`https://viacep.com.br/ws/${cepValue}/json/`).then(response => {
                console.log(response);
                const res = response.data

                if(Object.keys(res).length > 1){
                    setCidade(res.localidade)
                setLogradouro(res.logradouro)
                setEstado(res.uf)
                }else{
                    Swal.fire({
                        title: 'CEP Inválido',
                        icon: "info"
                    });
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }, [cep])

    useEffect(() => {
        if(
            cep.length > 8 && cidade.length > 5 && numero.length > 0 && estado.length > 1 && logradouro.length > 5
        ){
            onChangeDataJson({
                cep: cep,
                logradouro: logradouro,
                cidade: cidade,
                estado: estado,
                numero: numero,
                complemento: complemento
            })
        }

    }, [cep, estado, logradouro, cidade, complemento, numero]);

    useEffect(() => {
        if(
            cep.length > 8 && cidade.length > 5 && numero.length > 0 && estado.length > 1 && logradouro.length > 5
        ){
            onChangeDataJson({
                cep: cep,
                logradouro: logradouro,
                cidade: cidade,
                estado: estado,
                numero: numero,
                complemento: complemento
            })
        }

    }, [complemento]);

    return (
        <div className="address-form">
            <div className="box-inputs">
                <InputCEP
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    disable={disable}
                />
                <InputLabel
                    forLabel="logradouro"
                    placeholder="Rua sem nome - Digite o cep"
                    label="Logradouro"
                    type="text"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                    disable={true}
                />
                <InputLabel
                    forLabel="cidade"
                    placeholder="São Paulo - Digite o cep"
                    label="Cidade"
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    disable={true}
                />
                <InputLabel
                    forLabel="estado"
                    placeholder="SP - Digite o cep"
                    label="Estado"
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    disable={true}
                />
                <InputLabel
                    forLabel="numero"
                    placeholder="9999"
                    label="Número"
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    disable={disable}
                />
                <InputLabel
                    forLabel="complemento"
                    placeholder="Casa"
                    label="Complemento"
                    type="text"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
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

export default AddressForm;