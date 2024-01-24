/**************************************************************************************
 *  Goal: Interface de endereços
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

export interface AddressAll{
    id: number,
    cep: number,
    logradouro: string,
    cidade: string,
    estado: string,
    numero: number,
    complemento: string,
    id_pessoa: number
}

export interface AddressData{
    cep: string,
    logradouro: string,
    cidade: string,
    estado: string,
    numero: number,
    complemento: string
}