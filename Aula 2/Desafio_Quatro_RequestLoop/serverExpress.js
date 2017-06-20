var express = require('express')
var server = express();
var bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var name = "Guilherme";

server.get('/name', function (req, res) {
    res.send(name);
})

server.post('/name', function (req, res) {
    name = req.body.nome;
    res.send("Atualizado");
})

server.listen(3000, function () {
    console.log('Executando porta 3000')
});