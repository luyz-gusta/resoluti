/**************************************************************************************
 *  Goal: Manipulador e organizador dos dados do usuário
 *  Author: Luiz Gustavo
 *  Date: 21/01/2023
 *  Version: 1.0
 **************************************************************************************/

import * as config from '../modulo/config'
import * as contactTypeDAO from '../model/contactTypeDAO'
import { ContactTypeAll, QueryContactType } from '../interface/ContactType'

const ctlGetContactType = async (): Promise<QueryContactType> => {
    const dataContactType: Array<ContactTypeAll> = await contactTypeDAO.mdlSelectAllContactType()

    if (dataContactType.length > 0) {
        return {
            error: false,
            status: config.SUCCESS_REQUEST.status,
            message: config.SUCCESS_REQUEST.message,
            data: dataContactType
        }
    } else {
        return {
            error: true,
            status: config.ERROR_INTERNAL_SERVER.status,
            message: config.ERROR_INTERNAL_SERVER.message,
            data: null
        }
    }
}

export {
    ctlGetContactType
}