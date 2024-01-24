/**************************************************************************************
 *  Goal: Page People
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/
import { useEffect, useState } from "react";
import ButtonLink from "../../components/ButtonLink";
import Header from "../../components/Header";
import PersonData from "../../components/PersonData";
import SubTitle from "../../components/Subtitle";
import '../../css/people.css'
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../Service";
import { useNavigate } from "react-router-dom";

const People = () => {
    const [personList, setPersonList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const idUser = sessionStorage.getItem('idUser')

        if (idUser) {
            axios.get(`${baseUrl}/v1/person`)
                .then(response => {
                    setPersonList(response.data.data)
                }).catch(error => {
                    Swal.fire({
                        title: "Sistema fora do ar, tente novamente mais tarde",
                        icon: "info"
                    })
                })
        } else {
            Swal.fire({
                title: "Para acessar o sistema tem que estar logado",
                icon: "info",
            }).then( result => {
                if(result){
                    navigate('/')
                }
            })
        }
    }, [])

    const exit = () => {
        sessionStorage.removeItem('idUser')
        navigate('/')
    }

    return (
        <div className="people">
            <Header onClick={exit}/>
            <div className="container-people">
                <SubTitle subtitle="Pessoas Físicas" />
                <ButtonLink
                    onClick={() => {
                        sessionStorage.setItem('session', 'create')
                        navigate('/createperson/create')
                    }}
                />
                <div className="list-people">
                    {
                        personList.map(person => {
                            return (
                                <PersonData data={person} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default People;