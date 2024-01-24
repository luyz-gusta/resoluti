/**************************************************************************************
 *  Goal: Model responsável por gerenciar funções de pessoas físicas do database
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { PrismaClient } from '@prisma/client'
import { PersonAll, PersonalData } from '../interface/Person'
const prisma = new PrismaClient()

const mdlSelectAllPeople = async (): Promise<Array<PersonAll>> => {
    const sql = `select 
        pessoa.id,
        pessoa.nome,
        pessoa.sobrenome,
        pessoa.email,
        pessoa.cpf,
        pessoa.rg,
        pessoa.id_usuario,
        date_format(pessoa.data_nascimento, '%d/%m/%Y') as data_nascimento
    from tbl_pessoa as pessoa order by id desc`

    const rsPerson: Array<PersonAll> = await prisma.$queryRawUnsafe(sql)

    return rsPerson
}

const mdlSelectPersonLastId = async (): Promise<Array<PersonAll>> => {
    let sql = `select 
        pessoa.id,
        pessoa.nome,
        pessoa.sobrenome,
        pessoa.email,
        pessoa.cpf,
        pessoa.rg,
        pessoa.id_usuario,
        date_format(pessoa.data_nascimento, '%d/%m/%Y') as data_nascimento
    from tbl_pessoa as pessoa order by id desc limit 1`

    const rsUser: Array<PersonAll> = await prisma.$queryRawUnsafe(sql)

    return rsUser
}

const mdlSelectPersonById = async (idPerson: number): Promise<Array<PersonAll>> => {
    let sql = `select 
        pessoa.id,
        pessoa.nome,
        pessoa.sobrenome,
        pessoa.email,
        pessoa.cpf,
        pessoa.rg,
        pessoa.id_usuario,
        date_format(pessoa.data_nascimento, '%d/%m/%Y') as data_nascimento
    from tbl_pessoa as pessoa where id = ${idPerson}`

    const rsUser: Array<PersonAll> = await prisma.$queryRawUnsafe(sql)

    return rsUser
}


const mdlInsertPerson = async (data: PersonalData): Promise<boolean> => {
    const sql = `insert into tbl_pessoa(
        nome,
        sobrenome,
        email,
        cpf,
        rg,
        data_nascimento,
        id_usuario
    )values(
        '${data.nome}',
        '${data.sobrenome}',
        '${data.email}',
        '${data.cpf}',
        '${data.rg}',
        '${data.data_nascimento}',
        ${data.id_usuario}
    )`

    const resultStatus: number = await prisma.$executeRawUnsafe(sql)

    return resultStatus ? true : false
}

const mdlUpdatePerson = async (data: PersonalData, idPerson: number): Promise<boolean> => {
    const sql = `update tbl_pessoa set 
	    nome = '${data.nome}' ,
	    sobrenome = '${data.sobrenome}', 
	    data_nascimento = '${data.data_nascimento}', 
	    email = '${data.email}',
        cpf = '${data.cpf}',
	    rg = '${data.rg}'
    where id = ${idPerson}`

    const resultStatus: number = await prisma.$executeRawUnsafe(sql)

    return resultStatus ? true : false
}

const mdlDeletePerson = async (idPerson: number): Promise<boolean> => {
    const sql = `delete from tbl_pessoa where id = ${idPerson}`

    const resultStatus: number = await prisma.$executeRawUnsafe(sql)

    return resultStatus ? true : false
}

export {
    mdlSelectAllPeople,
    mdlSelectPersonLastId,
    mdlSelectPersonById,
    mdlInsertPerson,
    mdlUpdatePerson,
    mdlDeletePerson
}