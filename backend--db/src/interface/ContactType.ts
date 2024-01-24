/**************************************************************************************
 *  Goal: Interface de contatos e tipoContato
 *  Author: Luiz Gustavo
 *  Date: 21/01/2023
 *  Version: 1.0
 **************************************************************************************/

export interface ContactTypeAll{
    id: number,
    tipo: string
}

export interface QueryContactType{
    error: boolean,
    status: number,
    message: string,
    data?: Array<ContactTypeAll>
}