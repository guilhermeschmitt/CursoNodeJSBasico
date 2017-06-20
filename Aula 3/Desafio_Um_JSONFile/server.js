var express = require('express');
var app = express();
var jsonfile = require('./readfile');
var json = jsonfile('./file.json');

app.get('/', function (req, res) {
    res.send("<html><body>Bem vindo</body></html>");
})

app.get('/contatos', function (req, res) {
    res.json(json.contatos);
})

app.listen(porta, function (req, res) {
    console.log("Servidor rodando com Express na porta: " + json.porta);
});