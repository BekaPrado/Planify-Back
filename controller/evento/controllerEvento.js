const DAOevento=require('../../model/DAO/evento/eventoDAO.js')
const DAOeventoCategoria = require ('../../model/DAO/evento/evento_categoriaDAO.js')
const DAOeventoParticipante = require ('../../model/DAO/evento/participar_evento.js')

const controllerEventoCategoria = require ('../../controller/evento/controllerEventoCategoria.js')
const controllerUsuario=require('../../controller/usuario/controllerUsuario.js')
const controllerParticipante = require('./controllerParticiparEvento.js')

const message =require('../../modulo/config.js')

const inserirEvento = async (evento, contentType) => {
    
    try {
        if (contentType && contentType.includes('application/json')) {
            dados={}
            if (
                evento.titulo == ''              || evento.titulo == undefined               || evento.titulo == null              || evento.titulo.length > 100    ||
                evento.descricao == ''           || evento.descricao == undefined            || evento.descricao == null           || evento.descricao.length > 60  ||
                evento.data_evento == ''         || evento.data_evento == undefined          || evento.data_evento == null         || evento.data_evento.length > 20||
                evento.horario == ''             || evento.horario == undefined              || evento.horario == null             || evento.horario.length > 15    ||
                evento.local == ''               || evento.local == undefined                || evento.local == null               || evento.local.length > 70      ||
                evento.imagem == ''              || evento.imagem == undefined               || evento.imagem == null              || evento.imagem.length > 500    ||
                evento.limite_participante == '' || evento.limite_participante == undefined  || evento.limite_participante == null ||
                evento.valor_ingresso == ''      || evento.valor_ingresso == undefined       || evento.valor_ingresso == null      ||
                evento.id_usuario == ''          || evento.id_usuario == undefined           || evento.id_usuario == null          || 
                evento.id_estado == ''          || evento.id_estado == undefined           || evento.id_estado == null
            ) {

                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOevento.inserirEvento(evento)
                if (result) {
                    if (evento.categoria && Array.isArray(evento.categoria)) {
                        let eventoInserido = await DAOevento.selectLastId()
                        //Pegando o ultimo id inserido
                        let idEvento = eventoInserido[0].id_evento //vendo se volta id

                        for (let categoria of evento.categoria) {
                            if (categoria.id_categoria && !isNaN(categoria.id_categoria)) {
                                let eventoCategoria = {
                                    id_evento: idEvento,
                                    id_categoria: categoria.id_categoria
                                }
                                await DAOeventoCategoria.insertEventoCategoria(eventoCategoria)
                            }
                        }
                    }
                    if (evento.participante && Array.isArray(evento.participante)) {
                        let eventoInserido = await DAOevento.selectLastId()
                        //Pegando o ultimo id inserido
                        let idEvento = eventoInserido[0].id_evento //vendo se volta id

                        for (let participante of evento.participante) {
                            if (participante.id_usuario && !isNaN(participante.id_usuario)) {
                                let eventoParticipante = {
                                    id_evento: idEvento,
                                    id_usuario: participante.id_usuario
                                }
                                await  DAOeventoParticipante.insertParticiparEvento(eventoParticipante)
                            }
                        }
                    }
                    let lastid = await DAOevento.selectLastId()
                    dados={
                        status:true,
                        status_code:200,
                        eventoID:lastid,
                        evento:evento
                    }
                    return dados
                    
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarEvento = async (id, evento, contentType) => {
    try {
        if (contentType == 'application/json') {
            if (
                evento.titulo == '' || evento.titulo == undefined || evento.titulo == null || evento.titulo.length > 100 ||
                evento.descricao == '' || evento.descricao == undefined || evento.descricao == null || evento.descricao.length > 60 ||
                evento.data_evento == '' || evento.data_evento == undefined || evento.data_evento == null || evento.data_evento.length > 20 ||
                evento.horario == '' || evento.horario == undefined || evento.horario == null || evento.horario.length > 15 ||
                evento.local == '' || evento.local == undefined || evento.local == null || evento.local.length > 70 ||
                evento.imagem == '' || evento.imagem == undefined || evento.imagem == null || evento.imagem.length > 500 ||
                evento.limite_participante == '' || evento.limite_participante == undefined || evento.limite_participante == null ||
                evento.valor_ingresso == '' || evento.valor_ingresso == undefined || evento.valor_ingresso == null ||
                evento.id_usuario == '' || evento.id_usuario == undefined || evento.id_usuario == null ||  evento.id_estado == ''          || evento.id_estado == undefined           || evento.id_estado == null
            ) {

                return message.ERROR_REQUIRED_FIELDS
            }
            let result=await DAOevento.selectEventoById(id)
            if (result != false || typeof(result)== 'object') {
                if (result.length>0) {
                    evento.id=parseInt(id)

                    let result = await DAOevento.updateEvento(genero)

                    if (result) {
                        
                        return message.SUCESS_UPDATED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
       console.log(error)
       return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const excluirEvento = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOevento.selectEventoById(parseInt(id))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOevento.deleteEvento(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
                
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarEvento = async function () {
    try {
        let arrayEventos=[]
        let dados={}
        let result = await DAOevento.selectAllEvento()
        
        if (result != false || typeof(result)=='object') {
        
            if(result.length>0){
                dados.status=true
                dados.status_code=200,
                dados.itens=result.length
                dados.eventos=result

                for (const itemEvento of result) {
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                    //Busca os dados da classificação na controller de classificacao
                    let dadosUsuario = await controllerParticipante.buscarUsuario(itemEvento.id_usuario)
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemEvento.usuario = dadosUsuario.usuario
                    //Remover um atributo do JSON
                    delete itemEvento.id_usuario
                    
                    let dadosCategoria = await controllerEventoCategoria.buscarCategoriaPorEvento(itemEvento.id_evento)
                    itemEvento.categoria = dadosCategoria.categoria
                
                    //delete itemFilme.id_genero
                    let dadosParticipante = await controllerParticipante.buscarUsuarioPorEvento(itemEvento.id_evento)
                    itemEvento.participante = dadosParticipante.usuario
                    
                    

                    arrayEventos.push(itemEvento)
                }
                
                dados.eventos = arrayEventos

                return dados
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        //cha,a a funcao para retornarusuarios cadastrados
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER ///500
    }
}

const buscarEvento = async function (id) {
    let dados={}
    try {
        if (id == ''|| id == undefined|| id == null|| id<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOevento.selectEventoById(id)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dados={
                        status:true,
                        status_code:200,
                        usuario:result

                        
                    }
                    return dados
                }else{
                    return message.ERROR_NOT_FOUND//404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports={
    inserirEvento,
    atualizarEvento,
    excluirEvento,
    listarEvento,
    buscarEvento
}