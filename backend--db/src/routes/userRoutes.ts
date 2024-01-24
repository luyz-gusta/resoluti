/**************************************************************************************
 *  Goal: Arquivo resposável pelas rotas do CRUD de usuários
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import Express, { Router, Request, Response } from 'express'
import * as config from '../modulo/config'
import * as userController from '../controller/userController'
import { LoginUser, QueryUser, User } from '../interface/User'

const router: Router = Express.Router()

router.post('/login', async (request: Request, response: Response) => {
    const body: LoginUser = request.body

    let contentType: string = request.headers['content-type']

    if (contentType == 'application/json') {
        const dataJson: QueryUser = await userController.ctlLogin(body)

        response.status(dataJson.status)
        response.json(dataJson)
    } else {
        response.json(config.ERROR_INVALID_CONTENT_TYPE)
        response.status(config.ERROR_INVALID_CONTENT_TYPE.status)
    }
})

router.post('/', async (request: Request, response: Response) => {
    const body: User = request.body

    let contentType: string = request.headers['content-type']

    if (contentType == 'application/json') {
        const dataJson: QueryUser = await userController.ctlCreateUser(body)

        response.status(dataJson.status)
        response.json(dataJson)
    } else {
        response.json(config.ERROR_INVALID_CONTENT_TYPE)
        response.status(config.ERROR_INVALID_CONTENT_TYPE.status)
    }
})

module.exports = router