const DAOEstado=require('../../model/DAO/estadoDAO.js')
const message =require('../../modulo/config.js')

const inserirEstado = async (estado, contentType) => {
    try {
        if (contentType && contentType.includes('application/json')) {

            if (estado.estado == ''                || estado.estado == undefined            || estado.estado == null             || estado.estado.length>100
            ){

                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOEstado.inserirEstado(estado)
                if (result) {
                    return message.SUCESS_CREATED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarEstado = async (id, estado, contentType) => {
    try {
        if (contentType == 'application/json') {
            if (estado.estado == ''                || estado.estado == undefined            || estado.estado == null             || estado.estado.length>100   
            ){
                


                return message.ERROR_REQUIRED_FIELDS
            }
            let result=await DAOEstado.selectEstadoById(id)
            if (result != false || typeof(result)== 'object') {
                if (result.length>0) {
                    estado.id=parseInt(id)
                    
                    let result = await DAOEstado.updateEstado(estado)
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
       return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const excluirEstado = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOEstado.selectEstadoById(parseInt(id))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOEstado.deleteEstado(parseInt(id))

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

const listarEstado = async function () {
    try {
        let dados={}
        let result = await DAOEstado.selectAllEstado()
        if (result != false || typeof(result)=='object') {
        
            if(result.length>0){
                dados.status=true
                dados.status_code=200,
                dados.itens=result.length
                dados.categoria=result
                return dados
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        //chama a funcao para retornar categorias cadastradas
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER ///500
    }
}

const buscarEstado = async function (id) {
    let dados={}
    try {
        
        if (id == ''|| id == undefined|| id == null|| id<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOEstado.selectEstadoById(id)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dados={
                        status:true,
                        status_code:200,
                        categoria:result
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
    inserirEstado,
    listarEstado,
    buscarEstado,
    excluirEstado,
    atualizarEstado
}