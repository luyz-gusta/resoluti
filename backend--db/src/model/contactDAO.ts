/**************************************************************************************
 *  Goal: Model responsável por gerenciar funções de contato database
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { PrismaClient } from '@prisma/client'
import { ContactAll, ContactData } from '../interface/Contact'
const prisma = new PrismaClient()

const mdlSelectContactByIdPerson = async (idPerson: number): Promise<Array<ContactAll>> => {
    let sql = `select
	    contato.id,
        contato.nome,
        contato.contato,
        contato.id_tipo_contato,
        tipo.tipo,
        contato.id_pessoa
    from tbl_contatos as contato
        inner join tbl_tipo_contato as tipo
        on contato.id_tipo_contato = tipo.id
    where id_pessoa = ${idPerson} order by contato.id asc`

    const rsAddress: Array<ContactAll> = await prisma.$queryRawUnsafe(sql)

    return rsAddress
}

const mdlInsertContactAtScale = async (contact: Array<ContactData>, idPerson: number): Promise<Array<ContactAll>> => {

    for (let i = 0; i < contact.length; i++) {
        const cont = contact[i];

        const sql = `insert into tbl_contatos(
            nome,
            contato,
            id_tipo_contato,
            id_pessoa
        )values(
            '${cont.nome}',
            '${cont.contato}',
            ${cont.id_tipo_contato},
            ${idPerson}
        )`        

        await prisma.$executeRawUnsafe(sql)
    }

    const contactList: Array<ContactAll> = await mdlSelectContactByIdPerson(idPerson)

    return contactList
}

const mdlUpdateContacts = async (contacts: Array<ContactData>, idPerson: number): Promise<Array<ContactAll>> => {
    const sqlDelete = `delete from tbl_contatos where id_pessoa = ${idPerson}`
    await prisma.$executeRawUnsafe(sqlDelete)

    const contactList = await mdlInsertContactAtScale(contacts, idPerson)
    return contactList
}

export{
    mdlSelectContactByIdPerson,
    mdlInsertContactAtScale,
    mdlUpdateContacts
}
