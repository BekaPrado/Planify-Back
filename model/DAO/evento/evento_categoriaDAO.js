//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertEventoCategoria = async function(EventoCategoria){
  try {

      let sql = `insert into tbl_evento_categoria  ( 
                                          id_categoria,
                                          id_evento
                                        ) 
                                          values 
                                        (
                                          ${EventoCategoria.id_categoria},
                                          ${EventoCategoria.id_evento}
                                        )`

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}
const updateEventoCategoria = async function(EventoCategoria){
    try {
        let sql = `update tbl_evento_categoria set    id_categoria = ${EventoCategoria.id_categoria},
                                                      id_evento = ${EventoCategoria.id_evento}
                                          
                              where id_evento_categoria = ${EventoCategoria.id_evento_categoria}                
                              `
        let result = await prisma.$executeRawUnsafe(sql)
  
        if(result)
          return true
        else
          return false
    } catch (error) {
      return false
    }
}
const deleteEventoCategoria = async function(id_evento_categoria){
    try {
      let sql = `delete from tbl_evento_categoria where id_evento_categoria = ${id_evento_categoria}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllEventoCategoria = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_evento_categoria order by id_evento_categoria desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}
const selectByIdEventoCategoria = async function(id_evento_categoria){
    try {
      let sql = `select * from tbl_evento_categoria where id_evento_categoria = ${id_evento_categoria}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}

const selectEventoByIdCategoria = async function(id_categoria){
    try {
        let sql = `select tbl_evento.* from tbl_evento 
                                              inner join tbl_evento_categoria
                                                on tbl_evento.id = tbl_evento_categoria.id_evento
                                              inner join tbl_categoria
                                                on tbl_categoria.id_categoria = tbl_evento_categoria.id_categoria
                    where tbl_evento_categoria.id_categoria = ${id_categoria}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
          return result
      else 
          return false
    } catch (error) {
        return false
    }
}

const selectCategoriaByIdEvento = async function(idEvento){
    try {
         let sql = `select tbl_categoria.* from tbl_evento 
                                               inner join tbl_evento_categoria
                                                 on tbl_evento.id_evento = tbl_evento_categoria.id_evento
                                               inner join tbl_categoria
                                                 on tbl_categoria.id_categoria = tbl_evento_categoria.id_categoria
                     where tbl_evento_categoria.id_evento = ${idEvento}`
                     
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
    insertEventoCategoria,
    updateEventoCategoria,
    deleteEventoCategoria,
    selectAllEventoCategoria,
    selectByIdEventoCategoria,
    selectEventoByIdCategoria,
    selectCategoriaByIdEvento
} 