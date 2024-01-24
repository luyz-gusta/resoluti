/**************************************************************************************
 *  Goal: Manipulador e organizador dos dados do usuário
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import * as config from '../modulo/config'
import * as userDAO from '../model/userDAO'
import { LoginUser, QueryUser, User, UserAll } from '../interface/User'

const ctlLogin = async (data: LoginUser): Promise<QueryUser> => {

    if (
        data.email == '' || data.email == null || data.email == undefined || data.email.length > 255 ||
        data.senha == '' || data.senha == null || data.senha == undefined || data.senha.length > 255
    ) {
        return {
            error: true,
            status: config.ERROR_REQUIRE_FIELDS.status,
            message: config.ERROR_REQUIRE_FIELDS.message,
            data: null
        }
    } else {
        const dataUser: Array<UserAll> = await userDAO.mdlLogin(data)

        if (dataUser.length > 0) {
            return {
                error: false,
                status: config.SUCCESS_REQUEST.status,
                message: config.SUCCESS_REQUEST.message,
                data: dataUser
            }
        } else {
            return {
                error: true,
                status: config.ERROR_REGISTER_NOT_FOUND.status,
                message: config.ERROR_REGISTER_NOT_FOUND.message,
                data: null
            }
        }
    }
}

const ctlCreateUser = async (data: User): Promise<QueryUser> => {

    if (
        data.username == '' || data.username.length > 80 || data.username == null ||
        data.email == '' || data.email == null || data.email == undefined || data.email.length > 255 ||
        data.telefone == '' || data.telefone == null || data.telefone == undefined || data.telefone.length > 15 ||
        data.senha == '' || data.senha == null || data.senha == undefined || data.senha.length > 255 ||
        data.imagem == '' || data.imagem == null || data.imagem == undefined || data.imagem.length > 255
    ) {
        return {
            error: true,
            status: config.ERROR_REQUIRE_FIELDS.status,
            message: config.ERROR_REQUIRE_FIELDS.message,
            data: null
        }
    } else {
        const existingEmail = await userDAO.mdlSelectUserByEmail(data.email)

        if (existingEmail.length > 0) {
            return {
                error: true,
                status: config.ERROR_EXISTING_EMAIL.status,
                message: config.ERROR_EXISTING_EMAIL.message,
                data: null
            }
        } else {
            const insertUser: boolean = await userDAO.mdlInsertUser(data)

            if (insertUser) {
                const dataUser: Array<UserAll> = await userDAO.mdlSelectUserLastId()

                return {
                    error: false,
                    status: config.SUCCESS_CREATED.status,
                    message: config.SUCCESS_CREATED.message,
                    data: dataUser
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
    }
}

export {
    ctlLogin,
    ctlCreateUser
}