/**************************************************************************************
 *  Goal: Model responsável por gerenciar funções de tipo de contato do database
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { PrismaClient } from '@prisma/client'
import { ContactTypeAll } from '../interface/ContactType'
const prisma = new PrismaClient()

const mdlSelectAllContactType = async (): Promise<Array<ContactTypeAll>> => {
    let sql = 'select * from tbl_tipo_contato'

    const rsContactType: Array<ContactTypeAll> = await prisma.$queryRawUnsafe(sql)

    return rsContactType
}

export {
    mdlSelectAllContactType
}