const port = 4004;
const bodyParser = require('body-parser'); // ajuda a fazer o parser do JSON que vieram do formulario para o backend
const express = require('express');
const server = express();
const allowCors = require('./cors');

// bodyParser é um middleware que será o responsavel em fazer parser dos dados submetidos do formulário
// estes dois middlewares serão chamados para todas as requisições da aplicação
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json()); // se for json faz o parser para um objeto JSON
server.use(allowCors); // permitir fazer requisição entre dominios diferentes na API

server.listen(port, function(){
    console.log(`BACKEND está correndo na porta ${port}.`);
});

// Só para efeitos de exemplo mostrando que o conceito do express do midleware 
// chamando as requisições encadeadas através do next
/* server.use( (req, res, next) => {
    console.log('meu middleware 1');
    next();
});

server.use( (req, res, next) =>{
    console.log('meu middeware 2');
    res.send('Funcionou novamente!!!');
}); */
// exporta o server para ser usado no loader.js e este por sua vez ser passado como
// parâmetro para o router.js
module.exports = server;