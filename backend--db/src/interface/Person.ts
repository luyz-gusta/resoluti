/**************************************************************************************
 *  Goal: Interface de pessoas
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { AddressAll, AddressData } from "./Address"
import { ContactAll, ContactData } from "./Contact"

export interface PersonAll{
    id: number,
    nome: string,
    sobrenome: string,
    email: string,
    data_nascimento: string,
    cpf: string,
    rg: string,
    id_usuario: number
}

export interface CreatePerson{
    id_usuario: number,
    personal_data: PersonalData,
    address: Array<AddressData>,
    contacts: Array<ContactData>
}

export interface UpdatePerson{
    personal_data: PersonalData,
    address: Array<AddressData>,
    contacts: Array<ContactData>
}

export interface PersonalData{
    nome: string,
    sobrenome: string,
    email: string,
    data_nascimento: string,
    cpf: string,
    rg: string,
    id_usuario: number
}

export interface QueryPeople{
    error: boolean,
    status: number,
    message: string,
    data?: Array<PersonAll>
}

export interface QueryPerson{
    error: boolean,
    status: number,
    message: string,
    data?: Person
}

export interface Person {
    personal_data: PersonAll,
    address: Array<AddressAll>,
    contacts: Array<ContactAll>
}