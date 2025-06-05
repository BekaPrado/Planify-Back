//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const participarEventoDAO = require('../../model/DAO/evento/participar_evento')

const inserirParticiparEvento = async function (participarEvento, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                participarEvento.id_evento == '' || participarEvento.id_evento == undefined || participarEvento.id_evento == null || isNaN(participarEvento.id_evento) || participarEvento.id_evento <= 0 ||
                participarEvento.id_usuario == '' || participarEvento.id_usuario == undefined || participarEvento.id_usuario == null || isNaN(participarEvento.id_usuario) || participarEvento.id_usuario <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultUsuario = await participarEventoDAO.insertParticiparEvento(participarEvento)

                if (resultUsuario)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarParticiparEvento = async function (id, participarEvento, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                participarEvento.id_evento == '' || participarEvento.id_evento == undefined || participarEvento.id_evento == null || isNaN(participarEvento.id_evento) || participarEvento.id <= 0 ||
                participarEvento.id_usuario == '' || participarEvento.id_usuario == undefined || participarEvento.id_usuario == null || isNaN(participarEvento.id_usuario) || participarEvento.id_usuario <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultUsuario = await participarEventoDAO.selectByIdParticiparEvento(parseInt(id))

                if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                    if (resultUsuario.length > 0) {
                        //Update
                        //Adiciona o ID do genero no JSON com os dados
                        usuario.id_usuario = parseInt(id)

                        let result = await participarEventoDAO.updateParticiparEvento(participarEvento)

                        if (result) {
                            return message.SUCESS_UPDATED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
const excluirParticiparEvento = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Funcção que verifica se  ID existe no BD
            let result = await participarEventoDAO.selectByIdParticiparEvento(parseInt(id))

            if (result != false || typeof (result) == 'object') {
                //Se existir, faremos o delete
                if (result.length > 0) {
                    //delete
                    let result = await participarEventoDAO.deleteParticiparEvento(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarParticiparEvento = async function () {
    try {
        //Objeto do tipo JSON
        let dadosusuario = {}
        //Chama a função para retornar os generos cadastrados
        let resultUsuario = await participarEventoDAO.selectAllParticiparEvento()

        if (resultUsuario != false || typeof (resultUsuario) == 'object') {
            if (resultUsuario.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosusuario.status = true
                dadosusuario.status_code = 200
                dadosusuario.items = resultUsuario.length
                dadosusuario.films = resultUsuario

                return dadosusuario
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarParticiparEvento = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosusuario = {}

            let resultUsuario = await participarEventoDAO.selectByIdParticiparEvento(parseInt(id))

            if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosusuario.status = true
                    dadosusuario.status_code = 200
                    dadosusuario.usuario = resultUsuario

                    return dadosusuario //200
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarUsuarioPorEvento = async function (id) {
    
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosusuario = {}
            let resultUsuario = await participarEventoDAO.selectUsuarioByIdEvento(parseInt(id))
            if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosusuario.status = true
                    dadosusuario.status_code = 200
                    dadosusuario.usuario = resultUsuario

                    return dadosusuario //200
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarEventoPorUsuario = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosusuario = {}
            let resultUsuario = await participarEventoDAO.selectEventoByIdUsuario(parseInt(id))

            if (resultUsuario != false || typeof (resultUsuario) == 'object') {
                if (resultUsuario.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosusuario.status = true
                    dadosusuario.status_code = 200
                    dadosusuario.usuario = resultUsuario

                    return resultUsuario //201
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// controllerShared.js

const DAOUser = require('../../model/DAO/usuarioDAO.js')

// apenas lógica de buscar usuário
const buscarUsuario = async function (id) {
    let dados = {}
    let arrayEventos = []
    try {
        if (id == ''|| id == undefined|| id == null|| id<0 ) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let result = await DAOUser.selectusuarioById(id)
            if (result != false || typeof(result)=='object'){
                if (result.length > 0) {
                    dados.status = true
                    dados.status_code = 200
                    dados.usuario = result
                    return dados
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

    

module.exports = {
    inserirParticiparEvento,
    atualizarParticiparEvento,
    excluirParticiparEvento,
    listarParticiparEvento,
    buscarParticiparEvento,
    buscarUsuarioPorEvento,
    buscarEventoPorUsuario,
    buscarUsuario
} 