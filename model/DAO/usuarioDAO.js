/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de cadastro
 * DATA: 20/05/2025
 * AUTOR: Gabriel Guedes
 * Versão: 1.0
 **************************************************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const inserirUsuario = async (dados) => {
    try {
        let sql = `
          INSERT INTO tbl_usuario (
            nome,
            email,
            senha,
            data_nascimento,
            foto_perfil,
            palavra_chave
          ) VALUES (
            '${dados.nome}',
            '${dados.email}',
            '${dados.senha}',
            '${dados.data_nascimento}',
            '${dados.foto_perfil}',
            '${dados.palavra_chave}'
          )
        `;
    
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
        }catch (error){
        console.error('Erro ao inserir relação filme-genero:', error);
        return false;
    }
}

const updateUsuario = async (dados) => {
    
    try {
        let sql = `update tbl_usuario set
                            nome = '${dados.nome}',
                            email = '${dados.email}',
                            senha = '${dados.senha}',
                            data_nascimento = '${dados.data_nascimento}',
                            foto_perfil = ${dados.foto_perfil ? `'${dados.foto_perfil}'` : null},
                            palavra_chave = ${dados.palavra_chave ? `'${dados.palavra_chave}'` : null}
                    where id_usuario = ${dados.id}`

        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if(resultFilme)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateSenhaUsuario = async (dados) => {
    
    try {
        let sql = `update tbl_usuario set
                            senha = '${dados.senha}'
                    where id_usuario = ${dados.id}`

        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if(resultFilme)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteUsuario = async function(id){
    try {
        let sql = `delete from tbl_usuario where id_usuario = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllUsuario = async function(){
    try {
        let sql = 'select * from tbl_usuario'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectusuarioById = async function(id){
    try {
        let sql = `select * from tbl_usuario where id_usuario = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}
const selectLastId = async function() {
    try {
        let sql = 'select id_usuario from tbl_usuario order by id_usuario desc limit 1'
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
const selectUsuarioByEmail = async (email) => {
  const sql = `SELECT * FROM tbl_usuario WHERE email = '${email}'`;
  const result = await prisma.$queryRawUnsafe(sql);
  return result;
};



module.exports = {
    inserirUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectusuarioById,
    selectLastId,
    updateSenhaUsuario,
    selectUsuarioByEmail
}