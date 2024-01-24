/**************************************************************************************
 *  Goal: Arquivo resposável pelas rotas do CRUD de pessoas
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import Express, { Router, Request, Response } from 'express'
import * as config from '../modulo/config'
import * as personController from '../controller/personController'
import { CreatePerson, QueryPeople, QueryPerson, UpdatePerson } from '../interface/Person'

const router: Router = Express.Router()

router.get('/', async (request: Request, response: Response) => {

    const dataJson: QueryPeople = await personController.ctlGetPeople()
    
    response.status(dataJson.status)
    response.json(dataJson)
})

router.get('/:id', async (request: Request, response: Response) => {
    const id = request.params.id

    const dataJson: QueryPerson = await personController.ctlGetPersonById(Number(id))

    response.status(dataJson.status)
    response.json(dataJson)
})

router.post('/', async (request: Request, response: Response) => {
    const body: CreatePerson = request.body

    let contentType: string = request.headers['content-type']

    if (contentType == 'application/json') {
        const dataJson: QueryPerson = await personController.ctlCreatePerson(body)

        response.status(dataJson.status)
        response.json(dataJson)
    } else {
        response.json(config.ERROR_INVALID_CONTENT_TYPE)
        response.status(config.ERROR_INVALID_CONTENT_TYPE.status)
    }
})

router.put('/:id', async (request: Request, response: Response) => {
    const idPerson = request.params.id
    const body: UpdatePerson = request.body

    let contentType: string = request.headers['content-type']

    if (contentType == 'application/json') {
        const dataJson: QueryPerson = await personController.ctlUpdatePerson(body, Number(idPerson))
        response.status(dataJson.status)
        response.json(dataJson)
    } else {
        response.json(config.ERROR_INVALID_CONTENT_TYPE)
        response.status(config.ERROR_INVALID_CONTENT_TYPE.status)
    }
})

router.delete('/:id', async (request: Request, response: Response) => {
    const id = request.params.id

    const dataJson: QueryPerson = await personController.ctlDeletePerson(Number(id))

    response.status(dataJson.status)
    response.json(dataJson)
})

module.exports = router