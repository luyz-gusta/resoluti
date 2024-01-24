/**************************************************************************************
 *  Goal: Model responsável por gerenciar funções de usuarios do database
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { PrismaClient } from '@prisma/client'
import { LoginUser, User, UserAll } from '../interface/User'
const prisma = new PrismaClient()

const mdlLogin = async (data: LoginUser): Promise<Array<UserAll>> => {
    let sql = `select * from tbl_usuario where email = '${data.email}' and senha = '${data.senha}'`

    const rsUser: Array<UserAll> = await prisma.$queryRawUnsafe(sql)

    return rsUser
}

const mdlSelectUserByEmail =async (email:string): Promise<Array<UserAll>> => {
    let sql = `select * from tbl_usuario where email = '${email}'`

    const rsUser: Array<UserAll> = await prisma.$queryRawUnsafe(sql)

    return rsUser
}

const mdlSelectUserById =async (id:number): Promise<Array<UserAll>> => {
    let sql = `select * from tbl_usuario where id = ${id}`

    const rsUser: Array<UserAll> = await prisma.$queryRawUnsafe(sql)

    return rsUser
}


const mdlSelectUserLastId = async (): Promise<Array<UserAll>> => {
    let sql = `select * from tbl_usuario order by id desc limit 1`

    const rsUser: Array<UserAll>= await prisma.$queryRawUnsafe(sql)

    return rsUser
}

const mdlInsertUser = async (data: User): Promise<boolean> => {

    let sql = `insert into tbl_usuario(
        username, 
        email, 
        telefone, 
        senha, 
        imagem
    ) values (
        '${data.username}',
        '${data.email}', 
        '${data.telefone}', 
        '${data.senha}', 
        '${data.imagem}'
    )`

    const resultStatus: number = await prisma.$executeRawUnsafe(sql)

    return resultStatus ? true : false
}

export {
    mdlLogin,
    mdlSelectUserByEmail,
    mdlSelectUserById,
    mdlSelectUserLastId,
    mdlInsertUser
}