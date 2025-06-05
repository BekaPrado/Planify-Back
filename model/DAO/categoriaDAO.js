/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de categoria
 * DATA: 20/05/2025
 * AUTOR: Gabriel Guedes
 * Versão: 1.0
 **************************************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const inserirCategoria = async (dados) => {
    try {
        let sql = `
          INSERT INTO tbl_categoria (
            categoria
          ) VALUES (
            '${dados.categoria}'
          )`
    
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
        }catch (error){
        console.error('Erro ao inserir relação filme-genero:', error);
        return false;
    }
}

const updateCategoria = async (dados) => {
    try {
        let sql = `update tbl_categoria set
                            categoria = '${dados.categoria}'
                    where id_categoria = ${dados.id}`

        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if(resultFilme)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteCategoria = async function(id){
    try {
        let sql = `delete from tbl_categoria where id_categoria = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllCategoria = async function(){
    try {
        let sql = 'select * from tbl_categoria order by id_categoria desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectCategoriaById = async function(id){
    try {
        let sql = `select * from tbl_categoria where id_categoria = ${id}`

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
    inserirCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategoria,
    selectCategoriaById
}