/**************************************************************************************
 *  Goal: Model responsável por gerenciar funções de endereços do database
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { PrismaClient } from '@prisma/client'
import { AddressAll, AddressData } from '../interface/Address'
const prisma = new PrismaClient()

const mdlSelectAddressByIdPerson = async (idPerson: number): Promise<Array<AddressAll>> => {
    let sql = `select * from tbl_enderecos where id_pessoa = ${idPerson} order by id asc`

    const rsAddress: Array<AddressAll> = await prisma.$queryRawUnsafe(sql)

    return rsAddress
}

const mdlInsertAddressAtScale = async (address: Array<AddressData>, idPerson: number): Promise<Array<AddressAll>> => {

    for (let i = 0; i < address.length; i++) {
        const location = address[i];

        const cepValue = location.cep.replace("-", "")

        const sql = `insert into tbl_enderecos(
            logradouro,
            numero,
            cep,
            complemento,
            cidade,
            estado,
            id_pessoa
        )values(
            '${location.logradouro}',
            ${location.numero},
            '${cepValue}',
            '${location.complemento}',
            '${location.cidade}',
            '${location.estado}',
            ${idPerson}
        )`

        await prisma.$executeRawUnsafe(sql)
    }

    const addressList: Array<AddressAll> = await mdlSelectAddressByIdPerson(idPerson)

    return addressList
}

const mdlUpdateAddress = async (address: Array<AddressData>, idPerson: number): Promise<Array<AddressAll>> => {
    const sqlDelete = `delete from tbl_enderecos where id_pessoa = ${idPerson}`
    const rs = await prisma.$queryRawUnsafe(sqlDelete)

    if (rs) {
        const addressList = await mdlInsertAddressAtScale(address, idPerson)
        return addressList
    }
}

export {
    mdlInsertAddressAtScale,
    mdlSelectAddressByIdPerson,
    mdlUpdateAddress
}