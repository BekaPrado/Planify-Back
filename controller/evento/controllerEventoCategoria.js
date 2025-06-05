//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const eventoCategoriaDAO = require('../../model/DAO/evento/evento_categoriaDAO.js')

const inserirEventoCategoria = async function (eventoCategoria, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                eventoCategoria.id_evento == '' || eventoCategoria.id_evento == undefined || eventoCategoria.id_evento == null || isNaN(eventoCategoria.id_evento) || eventoCategoria.id_evento <= 0 ||
                eventoCategoria.id_categoria == '' || eventoCategoria.id_categoria == undefined || eventoCategoria.id_categoria == null || isNaN(eventoCategoria.id_categoria) || eventoCategoria.id_categoria <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultcategoria = await eventoCategoriaDAO.insertEventoCategoria(eventoCategoria)

                if (resultcategoria)
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

const atualizarEventoCategoria = async function (id, eventoCategoria, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                eventoCategoria.id_evento == '' || eventoCategoria.id_evento == undefined || eventoCategoria.id_evento == null || isNaN(eventoCategoria.id_evento) || eventoCategoria.id <= 0 ||
                eventoCategoria.id_categoria == '' || eventoCategoria.id_categoria == undefined || eventoCategoria.id_categoria == null || isNaN(eventoCategoria.id_categoria) || eventoCategoria.id_categoria <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultCategoria = await eventoCategoriaDAO.selectByIdEventoCategoria(parseInt(id))

                if (resultCategoria != false || typeof (resultCategoria) == 'object') {
                    if (resultCategoria.length > 0) {
                        //Update
                        //Adiciona o ID do genero no JSON com os dados
                        genero.id_categoria = parseInt(id)

                        let result = await eventoCategoriaDAO.updateEventoCategoria(eventoCategoria)

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
const excluirEventoCategoria = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Funcção que verifica se  ID existe no BD
            let result = await eventoCategoriaDAO.selectByIdEventoCategoria(parseInt(id))

            if (result != false || typeof (result) == 'object') {
                //Se existir, faremos o delete
                if (result.length > 0) {
                    //delete
                    let result = await eventoCategoriaDAO.deleteEventoCategoria(parseInt(id))

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

const listarEventoCategoria = async function () {
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultgenero = await eventoCategoriaDAO.selectAllEventoCategoria()

        if (resultgenero != false || typeof (resultgenero) == 'object') {
            if (resultgenero.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosgenero.status = true
                dadosgenero.status_code = 200
                dadosgenero.items = resultgenero.length
                dadosgenero.films = resultgenero

                return dadosgenero
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

const buscarEventoCategoria = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosgenero = {}

            let resultgenero = await eventoCategoriaDAO.selectByIdFilmeGenero(parseInt(id))

            if (resultgenero != false || typeof (resultgenero) == 'object') {
                if (resultgenero.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
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

const buscarCategoriaPorEvento = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            
            return message.ERROR_REQUIRED_FIELDS //400
            
        } else {
            let dadoscategoria = {}

            let resultcategoria = await eventoCategoriaDAO.selectCategoriaByIdEvento(parseInt(id))
            resultcategoria

            if (resultcategoria != false || typeof (resultcategoria) == 'object') {
                if (resultcategoria.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadoscategoria.status = true
                    dadoscategoria.status_code = 200
                    dadoscategoria.categoria = resultcategoria

                    return dadoscategoria //200
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

const buscarEventoPorCategoria = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosFilme = {}

            let resultgenero = await eventoCategoriaDAO.selectEventoByIdCategoria(parseInt(id))

            if (resultgenero != false || typeof (resultgenero) == 'object') {
                if (resultgenero.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.genero = resultFilme

                    return dadosFilme //201
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

module.exports = {
    inserirEventoCategoria,
    atualizarEventoCategoria,
    excluirEventoCategoria,
    listarEventoCategoria,
    buscarEventoCategoria,
    buscarCategoriaPorEvento,
    buscarEventoPorCategoria
} 