/**************************************************************************************
 *  Goal: Responsável pelas constantes globais
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

/************************** CONSTANTES DE ERROS **********************/
const ERROR_REQUIRED_TOKEN = {status: 401, message: 'Token não fornecido.'}
const ERROR_INVALID_TOKEN = {status: 401, message: 'Token inválido.'}
const ERROR_INVALID_ID= {status: 401, message: 'Id inválido.'}
const ERROR_REGISTER = {status: 422, message: 'Erro não é permitido cadastrar o mesmo email.'}
const ERROR_INTERNAL_SERVER = {status: 500, message: 'Servidor está fora do ar, tente mais tarde.'}
const ERROR_REGISTER_NOT_FOUND= {status: 404, message: 'O servidor não encontrou o recurso solicitado.'}
const ERROR_REQUIRE_FIELDS = {status: 400, message: 'Não foram preenchidos todos os campos os obrigatórios como esperado.'}
const ERROR_INVALID_CONTENT_TYPE = {status: 415,message:"O tipo de mídia Content-type da solicitação não é compatível com o servidor. Tipo aceito:[application/json]"}
const ERROR_EXISTING_EMAIL = {status: 409,message:"Conflito!!Já existe no sistema um usuário com esse email."}
const ERROR_NOT_EXISTING_USER = {status: 404,message:"Erro, usuário não encontrado"}
const ERROR_DATA_ADDRESS = {status: 503,message:"Erro, não foi possível inserir os dados de endereço do pessoa física."}
const ERROR_DATA_CONTACT = {status: 503,message:"Erro, não foi possível inserir os dados de contato da pessoa física."}
const ERROR_PERSONAL_DATA = {status: 503,message:"Erro, não foi possível inserir os dados pessoais da pessoa física."}

/************************** CONSTANTES DE SUCESSO **********************/
const SUCCESS_CREATED = {status: 201, message: 'Item criado com sucesso!'}
const SUCCESS_UPDATED = {status: 200, message: 'Item atualizado com sucesso!'}
const SUCCESS_REQUEST = {status: 200, message: 'Requisição bem sucedida.'}
const SUCCESS_DELETED = {status: 200, message: 'Item deletado com sucesso!'}

export{
    //ERROR
    ERROR_REGISTER,
    ERROR_INTERNAL_SERVER,
    ERROR_REQUIRED_TOKEN,
    ERROR_INVALID_TOKEN,
    ERROR_REGISTER_NOT_FOUND,
    ERROR_REQUIRE_FIELDS,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_EXISTING_EMAIL,
    ERROR_NOT_EXISTING_USER,
    ERROR_PERSONAL_DATA,
    ERROR_DATA_ADDRESS,
    ERROR_DATA_CONTACT,
    ERROR_INVALID_ID,

    //SUCCESS
    SUCCESS_REQUEST,
    SUCCESS_CREATED,
    SUCCESS_UPDATED,
    SUCCESS_DELETED
}