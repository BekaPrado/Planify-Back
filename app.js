/******************************************************************************************************
 * OBJETIVO: Criar uma API para realizar o CRUD do sistema de Eventos                                 *
 * DATA: 20/05/2025                                                                                   *
 * AUTOR: Gabriel Guedes                                                                              *
 * Versão: 1.0                                                                                        *
 * Observação:                                                                                        *
 *          Para criar a API precisamos instalar:                                                     *
 *                 express             npm install express --save                                     *
 *                 cors                npm install cors --save                                        *
 *                 body-parser         npm install body-parser --save                                 *
 *                                                                                                    *
 *          Para criar a integração com o Banco de Dados precisamos instalar:                         *
 *                 prisma               npm install prisma --save(para fazer a conexão com o BD)       *
 *                 prisma/client        npm install @prisma/client --save (para rodar os scripts SQL) *
 *                                                                                                    *  
 *                                                                                                    *
 *          Após a instalação do prima e do prisma client, devemos :                                  *
 *              npx prisma init                                                                       *
 *                                                                                                    *
 *          Você deverá configurar o arquivo .env e o schema.prisma com as credenciais do BD          *
 *          Após essa configuração voce deverá rodar o seguinte comando:                              *
 *                      npx prisma migrate dev                                                        *
 *********************************************************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')
require('dotenv').config();

//Manipular o body da requisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()
// Cria o objeto app com referência ao express
const app = express()

// Middleware para permitir requisições CORS
app.use(cors())

// Corrige o cabeçalho CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// Middleware para interpretar JSON no body
app.use(express.json())

/*******************************************************************************************************************
 * 
 *                                  USUARIO
 * 
 ********************************************************************************************************************/

const controllerUsuario= require('./controller/usuario/controllerUsuario')
const controllerRecuperarSenha = require('./controller/usuario/controllerRecuperarSenha');


app.post('/v1/planify/usuario', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados

    
    let dadosBody=request.body
    let result= await controllerUsuario.inserirUsuario(dadosBody,contentType)
    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/planify/usuario/senha/:id', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados

    let id = request.params.id
    //body da requisição
    let dadosBody=request.body
    let result= await  controllerUsuario.atualizarSenhaUsuario(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/usuario', cors(), async function (request, response) {
    let result= await controllerUsuario.listarUsuario()
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/usuario/:id', cors(), async function (request, response) {
    let id=request.params.id
    let result= await controllerUsuario.buscarUsuario(id)
    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/planify/usuario/:id', cors(), async function (request, response){
    let id = request.params.id
    let result = await controllerUsuario.excluirUsuario(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/planify/usuario/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let id = request.params.id
    //body da requisição
    let dadosBody=request.body
    let result= await  controllerUsuario.atualizarUsuario(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})



app.post('/v1/planify/recuperar-senha', cors(), bodyParserJSON, controllerRecuperarSenha.enviarCodigo);
app.post('/v1/planify/validar-codigo', cors(), bodyParserJSON, controllerRecuperarSenha.validarCodigo);

/*******************************************************************************************************************
 * 
 *                                  EVENTO
 * 
 ********************************************************************************************************************/

const controllerEvento= require('./controller/evento/controllerEvento')

app.post('/v1/planify/evento', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let result= await controllerEvento.inserirEvento(dadosBody,contentType)
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/evento', cors(), async function (request, response) {
    let result= await controllerEvento.listarEvento()
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/evento/:id', cors(), async function (request, response) {
    let id=request.params.id
    let result= await controllerEvento.buscarEvento(id)
    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/planify/evento/:id', cors(), async function (request, response){
    let id = request.params.id
    let result = await controllerEvento.excluirEvento(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/planify/evento/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let id = request.params.id
    //body da requisição
    let dadosBody=request.body
    let result= await  controllerEvento.atualizarEvento(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

/*******************************************************************************************************************
 * 
 *                                      CATEGORIA
 * 
 ********************************************************************************************************************/

const controllerCategoria = require ('./controller/categoria/controllerCategoria')

app.post('/v1/planify/categoria', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let result= await controllerCategoria.inserirCategoria(dadosBody,contentType)
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/categoria', cors(), async function (request, response) {
    let result= await controllerCategoria.listarCategoria()
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/categoria/:id', cors(), async function (request, response) {
    let id=request.params.id
    let result= await controllerCategoria.buscarCategoria(id)
    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/planify/categoria/:id', cors(), async function (request, response){
    let id = request.params.id
    let result = await controllerCategoria.excluirCategoria(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/planify/categoria/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let id = request.params.id
    //body da requisição
    let dadosBody=request.body
    let result= await  controllerCategoria.atualizarCategoria(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

/*******************************************************************************************************************
 * 
 *                                      ESTADO
 * 
 ********************************************************************************************************************/

const controllerEstado= require ('./controller/estado/controllerEstado')

app.post('/v1/planify/estado', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisição
    let contentType=request.headers['content-type']
    //recebe do body da requisição os dados encaminhados
    let dadosBody=request.body
    let result= await controllerEstado.inserirEstado(dadosBody,contentType)
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/estado', cors(), async function (request, response) {
    let result= await controllerEstado.listarEstado()
    response.status(result.status_code)
    response.json(result)
})
app.get('/v1/planify/estado/:id', cors(), async function (request, response) {
    let id=request.params.id
    let result= await controllerEstado.buscarEstado(id)
    response.status(result.status_code)
    response.json(result)
})
app.delete('/v1/planify/estado/:id', cors(), async function (request, response){
    let id = request.params.id
    let result = await controllerEstado.excluirEstado(id)

    response.status(result.status_code)
    response.json(result)
})
app.put('/v1/planify/estado/:id', cors(), bodyParserJSON,async function (request, response) {
    //content-type requisição
    let contentType= request.headers['content-type']
    //id da requisção
    let id = request.params.id
    //body da requisição
    let dadosBody=request.body
    let result= await  controllerEstado.atualizarEstado(id, dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições..')
})