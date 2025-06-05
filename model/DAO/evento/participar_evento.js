//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertParticiparEvento = async function(eventoParticipante){
  console.log(eventoParticipante)
  try {

      let sql = `insert into tbl_participar_evento( 
                                          id_usuario,
                                          id_evento
                                        ) 
                                          values 
                                        (
                                          ${eventoParticipante.id_usuario},
                                          ${eventoParticipante.id_evento}
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
const updateParticiparEvento = async function(eventoParticipante){
    try {
        let sql = `update tbl_participar_evento set    id_evento = ${eventoParticipante.id_evento},
                                                      id_usuario = ${eventoParticipante.id_usuario}
                                          
                              where id_participar_evento = ${EventoCategoria.id_evento_categoria}                
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
const deleteParticiparEvento = async function(id_participar_evento){
    try {
      let sql = `delete from tbl_participar_evento where id_participar_evento = ${id_participar_evento}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllParticiparEvento = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_participar_evento order by id_participar_evento desc'

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
const selectByIdParticiparEvento = async function(id_participar_evento){
    try {
      let sql = `select * from tbl_participar_evento where id_participar_evento = ${id_participar_evento}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}

const selectEventoByIdUsuario = async function(id_usuario){
    try {
        let sql = `select tbl_evento.* from tbl_evento 
                                              inner join tbl_participar_evento
                                                on tbl_evento.id_evento = tbl_participar_evento.id_evento
                                              inner join tbl_usuario
                                                on tbl_usuario.id_usuario = tbl_participar_evento.id_usuario
                    where tbl_participar_evento.id_usuario = ${id_usuario}`
  
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

const selectUsuarioByIdEvento = async function(idEvento){
    try {
         let sql = `select tbl_usuario.* from tbl_evento 
                                               inner join tbl_participar_evento
                                                 on tbl_evento.id_evento = tbl_participar_evento.id_evento
                                               inner join tbl_usuario
                                                 on tbl_usuario.id_usuario = tbl_participar_evento.id_usuario
                     where tbl_participar_evento.id_evento = ${idEvento}`
                     
        let result = await prisma.$queryRawUnsafe(sql)
         console.log(result)

    if (result)
        return result
    else 
        return false
    } catch (error) {
      console.error(error)
        return false
    }
}

module.exports = {
    insertParticiparEvento,
    updateParticiparEvento,
    deleteParticiparEvento,
    selectAllParticiparEvento,
    selectByIdParticiparEvento,
    selectEventoByIdUsuario,
    selectUsuarioByIdEvento
} 