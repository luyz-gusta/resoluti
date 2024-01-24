/**************************************************************************************
 *  Goal: Manipulador e organizador dos dados da pessoa
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import * as config from '../modulo/config'
import * as personDAO from '../model/personDAO'
import { CreatePerson, Person, PersonAll, PersonalData, QueryPeople, QueryPerson, UpdatePerson } from '../interface/Person'
import { mdlSelectUserById } from '../model/userDAO'
import { UserAll } from '../interface/User'
import { mdlInsertAddressAtScale, mdlSelectAddressByIdPerson, mdlUpdateAddress } from '../model/addressDAO'
import { AddressAll, AddressData } from '../interface/Address'
import { ContactAll } from '../interface/Contact'
import { mdlInsertContactAtScale, mdlSelectContactByIdPerson, mdlUpdateContacts } from '../model/contactDAO'
import moment from 'moment'

const ctlGetPeople = async (): Promise<QueryPeople> => {
    const dataPeople: Array<PersonAll> = await personDAO.mdlSelectAllPeople()

    if (dataPeople.length > 0) {
        return {
            error: false,
            status: config.SUCCESS_REQUEST.status,
            message: config.SUCCESS_REQUEST.message,
            data: dataPeople
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

const ctlGetPersonById = async (idPerson: number): Promise<QueryPerson> => {
    const personal_data: Array<PersonAll> = await personDAO.mdlSelectPersonById(idPerson)

    if (personal_data.length > 0) {
        const address: Array<AddressAll> = await mdlSelectAddressByIdPerson(idPerson)
        const contacts: Array<ContactAll> = await mdlSelectContactByIdPerson(idPerson)

        const dataJson: Person = {
            personal_data: personal_data[0],
            address: address,
            contacts: contacts
        }

        return {
            error: false,
            status: config.SUCCESS_REQUEST.status,
            message: config.SUCCESS_REQUEST.message,
            data: dataJson
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

const ctlCreatePerson = async (data: CreatePerson): Promise<QueryPerson> => {
    if (
        data.personal_data.nome == '' || data.personal_data.nome == null || data.personal_data.nome == undefined || data.personal_data.nome.length > 50 ||
        data.personal_data.sobrenome == '' || data.personal_data.sobrenome == null || data.personal_data.sobrenome == undefined || data.personal_data.sobrenome.length > 50 ||
        data.personal_data.cpf == '' || data.personal_data.cpf == null || data.personal_data.cpf == undefined || data.personal_data.cpf.length > 15 ||
        data.personal_data.rg == '' || data.personal_data.rg == null || data.personal_data.rg == undefined || data.personal_data.rg.length > 14 ||
        data.personal_data.email == '' || data.personal_data.email == null || data.personal_data.email == undefined || data.personal_data.email.length > 255 ||
        data.personal_data.data_nascimento == '' || data.personal_data.data_nascimento == null || data.personal_data.data_nascimento == undefined ||
        data.id_usuario < 1 || data.id_usuario == null || data.id_usuario == undefined ||
        data.address.length < 1 || data.contacts.length < 1
    ) {
        return {
            error: true,
            status: config.ERROR_REQUIRE_FIELDS.status,
            message: config.ERROR_REQUIRE_FIELDS.message,
            data: null
        }
    } else {
        let exisitingUser: Array<UserAll> = await mdlSelectUserById(data.id_usuario)

        if (exisitingUser.length > 0) {
            const convertedDate = moment(data.personal_data.data_nascimento, 'DD/MM/YYYY')
                .format('YYYY-MM-DD')

            data.personal_data.data_nascimento = convertedDate

            const insertPersonalData: boolean = await personDAO.mdlInsertPerson(data.personal_data)

            if (insertPersonalData) {
                const newPerson: Array<PersonAll> = await personDAO.mdlSelectPersonLastId()

                const insertAddress: Array<AddressAll> = await mdlInsertAddressAtScale(data.address, newPerson[0].id)

                if (insertAddress.length > 0) {
                    const insertContact: Array<ContactAll> = await mdlInsertContactAtScale(data.contacts, newPerson[0].id)

                    if (insertContact.length > 0) {
                        const dataJson: Person = {
                            personal_data: newPerson[0],
                            address: insertAddress,
                            contacts: insertContact
                        }

                        return {
                            error: false,
                            status: config.SUCCESS_CREATED.status,
                            message: config.SUCCESS_CREATED.message,
                            data: dataJson
                        }
                    } else {
                        return {
                            error: true,
                            status: config.ERROR_DATA_CONTACT.status,
                            message: config.ERROR_DATA_CONTACT.message,
                            data: null
                        }
                    }
                } else {
                    return {
                        error: true,
                        status: config.ERROR_DATA_ADDRESS.status,
                        message: config.ERROR_DATA_ADDRESS.message,
                        data: null
                    }
                }
            } else {
                return {
                    error: true,
                    status: config.ERROR_PERSONAL_DATA.status,
                    message: config.ERROR_PERSONAL_DATA.message,
                    data: null
                }
            }
        } else {
            return {
                error: true,
                status: config.ERROR_NOT_EXISTING_USER.status,
                message: config.ERROR_NOT_EXISTING_USER.message,
                data: null
            }
        }
    }
}

const ctlUpdatePerson = async (data: UpdatePerson, idPerson: number): Promise<QueryPerson> => {
    if (
        data.personal_data.nome == '' || data.personal_data.nome == null || data.personal_data.nome == undefined || data.personal_data.nome.length > 50 ||
        data.personal_data.sobrenome == '' || data.personal_data.sobrenome == null || data.personal_data.sobrenome == undefined || data.personal_data.sobrenome.length > 50 ||
        data.personal_data.cpf == '' || data.personal_data.cpf == null || data.personal_data.cpf == undefined || data.personal_data.cpf.length > 15 ||
        data.personal_data.rg == '' || data.personal_data.rg == null || data.personal_data.rg == undefined || data.personal_data.rg.length > 14 ||
        data.personal_data.email == '' || data.personal_data.email == null || data.personal_data.email == undefined || data.personal_data.email.length > 255 ||
        data.personal_data.data_nascimento == '' || data.personal_data.data_nascimento == null || data.personal_data.data_nascimento == undefined ||
        idPerson < 1 || idPerson == null || idPerson == undefined ||
        data.address.length < 1 || data.contacts.length < 1
    ) {
        return {
            error: true,
            status: config.ERROR_REQUIRE_FIELDS.status,
            message: config.ERROR_REQUIRE_FIELDS.message,
            data: null
        }
    } else {
        const convertedDate = moment(data.personal_data.data_nascimento, 'DD/MM/YYYY')
            .format('YYYY-MM-DD')

        data.personal_data.data_nascimento = convertedDate

        const updatePersonalData: boolean = await personDAO.mdlUpdatePerson(data.personal_data, idPerson)

        if (updatePersonalData) {
            const updatedPerson: Array<PersonAll> = await personDAO.mdlSelectPersonById(idPerson)

            const updatedAddress: Array<AddressAll> = await mdlUpdateAddress(data.address, idPerson)

            if (updatedAddress.length > 0) {
                const updatedContact: Array<ContactAll> = await mdlUpdateContacts(data.contacts, idPerson)

                if (updatedContact.length > 0) {
                    const dataJson: Person = {
                        personal_data: updatedPerson[0],
                        address: updatedAddress,
                        contacts: updatedContact
                    }

                    return {
                        error: false,
                        status: config.SUCCESS_UPDATED.status,
                        message: config.SUCCESS_UPDATED.message,
                        data: dataJson
                    }
                } else {
                    return {
                        error: true,
                        status: config.ERROR_DATA_CONTACT.status,
                        message: config.ERROR_DATA_CONTACT.message,
                        data: null
                    }
                }
            } else {
                return {
                    error: true,
                    status: config.ERROR_DATA_ADDRESS.status,
                    message: config.ERROR_DATA_ADDRESS.message,
                    data: null
                }
            }
        } else {
            return {
                error: true,
                status: config.ERROR_PERSONAL_DATA.status,
                message: config.ERROR_PERSONAL_DATA.message,
                data: null
            }
        }
    }
}

const ctlDeletePerson = async (idPerson: number) => {
    if (idPerson == 0 || idPerson == null || idPerson == undefined) {
        return {
            error: false,
            status: config.ERROR_INVALID_ID.status,
            message: config.ERROR_INVALID_ID.message,
            data: null
        }
    } else {
        const deletedPerson: boolean = await personDAO.mdlDeletePerson(idPerson)

        if (deletedPerson) {
            return {
                error: false,
                status: config.SUCCESS_DELETED.status,
                message: config.SUCCESS_DELETED.message,
                data: null
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

export {
    ctlGetPeople,
    ctlGetPersonById,
    ctlCreatePerson,
    ctlUpdatePerson,
    ctlDeletePerson
}