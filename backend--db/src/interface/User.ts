/**************************************************************************************
 *  Goal: Interface de usuários
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

export interface UserAll{
    id: number,
    username: string,
    email: string,
    telefone: string,
    senha: string,
    imagem: string
}

export interface User{
    username: string,
    email: string,
    telefone: string,
    senha: string,
    imagem: string
}

export interface QueryUser{
    error: boolean,
    status: number,
    message: string,
    data?: Array<UserAll>
}

export interface LoginUser{
    email: string,
    senha: string
}
