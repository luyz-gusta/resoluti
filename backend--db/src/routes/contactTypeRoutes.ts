/**************************************************************************************
 *  Goal: Arquivo resposável pelas rotas do CRUD de contatos e tipos de contato
 *  Author: Luiz Gustavo
 *  Date: 21/01/2023
 *  Version: 1.0
 **************************************************************************************/

import Express, { Router, Request, Response } from 'express'
import * as contactTypeController from '../controller/contactTypeController'
import { QueryContactType } from '../interface/ContactType'

const router: Router = Express.Router()

router.get('/', async (request: Request, response: Response) => {

    const dataJson: QueryContactType = await contactTypeController.ctlGetContactType()

    response.status(dataJson.status)
    response.json(dataJson)
})

module.exports = router