/**************************************************************************************
 *  Goal: Person Data
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import axios from "axios";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../Service";

const PersonData = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div className="person-data">
            <p className="name">{data.nome}</p>
            <p className="email">{data.email}</p>
            <p className="birth-date">{data.data_nascimento}</p>
            <div className="action-icons">
                <span className="view" onClick={() => {
                    sessionStorage.setItem('idPerson', data.id)
                    navigate('/createperson/view')
                }}><FaEye /></span>
                <span className="edit" onClick={() => {
                    sessionStorage.setItem('idPerson', data.id)
                    navigate('/createperson/edit')
                }}><FaEdit /></span>
                <span className="delete" onClick={() => {
                    Swal.fire({
                        title: `Quer mesmo excluir o ${data.nome} ?`,
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Excluir",
                        denyButtonText: "Não"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete(`${baseUrl}/v1/person/${data.id}`, {
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
                                                title: "Deletado com sucesso!",
                                                icon: "success",
                                            }).then((res) => {
                                                if(res.isConfirmed){
                                                    window.location.reload()
                                                }
                                            })
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
                
                                        if (errorJson.status === 503) {
                                            Swal.fire({
                                                title: `${errorJson.message}`,
                                                icon: "error"
                                            });
                                        } else if (errorJson.status === 404) {
                                            Swal.fire({
                                                title: 'Erro, pessoa não encontrada!',
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
                    });
                }}><FaRegTrashAlt /></span>
            </div>
        </div>
    );
}

export default PersonData;