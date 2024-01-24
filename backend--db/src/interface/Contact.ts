/**************************************************************************************
 *  Goal: Interface de contatos 
 *  Author: Luiz Gustavo
 *  Date: 21/01/2023
 *  Version: 1.0
 **************************************************************************************/

export interface ContactAll{
    id: number,
    nome: string,
    contato: string,
    id_tipo_contato: number,
    tipo_contato: string,
    id_pessoa: number
}

export interface ContactData{
    nome: string,
    contato: string,
    id_tipo_contato: number
}