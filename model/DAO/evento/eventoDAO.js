/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de Evento
 * DATA: 20/05/2025
 * AUTOR: Gabriel Guedes
 * Versão: 1.0
 **************************************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const inserirEvento = async (dados) => {
    try {
        let sql = `
          INSERT INTO tbl_evento (
            titulo,
            descricao,
            data_evento,
            horario,
            local,
            imagem,
            limite_participante,
            valor_ingresso,
            id_usuario,
            id_estado
          ) VALUES (
            '${dados.titulo}',
            '${dados.descricao}',
            '${dados.data_evento}',
            '${dados.horario}',
            '${dados.local}',
            '${dados.imagem}',
            '${dados.limite_participante}',
            '${dados.valor_ingresso}',
            '${dados.id_usuario}',
            '${dados.id_estado}'
          )`
    
        let result = await prisma.$executeRawUnsafe(sql)
        return result 
        }catch (error){
        console.error('Erro ao inserir relação filme-genero:', error)
        return false
    }
}

const updateEvento = async (dados) => {
    try {
        let sql = `update tbl_evento set
            (
            titulo,
            descricao,
            data_evento,
            horario,
            local,
            imagem,
            limite_participantes,
            valor_ingresso,
            id_usuario
          ) VALUES (
            '${dados.titulo}',
            '${dados.descricao}',
            '${dados.data_evento}',
            '${dados.horario}',
            '${dados.local}',
            '${dados.imagem}',
            '${dados.limite_participantes}',
            '${dados.valor_ingresso}',
            '${dados.id_usuario}'
          ) where id =${dados.id}`
                    

        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if(resultFilme)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteEvento = async function(id){
    try {
        let sql = `delete from tbl_evento where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllEvento = async function(){
    try {
        let sql = 'select * from tbl_evento order by id_evento desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectEventoById = async function(id){
    try {
        let sql = `select * from tbl_evento where id_evento = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectLastId = async function() {
    try {
        let sql = 'select id_evento from tbl_evento order by id_evento desc limit 1'
        let result = await prisma.$queryRawUnsafe(sql)
        if (result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    inserirEvento,
    updateEvento,
    deleteEvento,
    selectAllEvento,
    selectEventoById,
    selectLastId
}