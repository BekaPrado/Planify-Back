/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de estado
 * DATA: 03/05/2025
 * AUTOR: Gabriel Guedes
 * Versão: 1.0
 **************************************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const inserirEstado = async (dados) => {
    try {
        let sql = `
          INSERT INTO tbl_estado (
            estado
          ) VALUES (
            '${dados.estado}'
          )`
    
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
        }catch (error){
        return false;
    }
}

const updateEstado = async (dados) => {
    try {
        let sql = `update tbl_estado set
                            estado = '${dados.estado}'
                    where id_estado = ${dados.id}`

        let resultEstado = await prisma.$executeRawUnsafe(sql)

        if(resultEstado)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteEstado= async function(id){
    try {
        let sql = `delete from tbl_estado where id_estado = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllEstado = async function(){
    try {
        let sql = 'select * from tbl_estado order by id_estado desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectEstadoById = async function(id){
    try {
        let sql = `select * from tbl_estado where id_estado = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirEstado,
    updateEstado,
    deleteEstado,
    selectAllEstado,
    selectEstadoById
}