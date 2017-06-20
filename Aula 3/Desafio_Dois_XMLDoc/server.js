var express = require('express');
var rf = require('./readfile');
var app = express();


app.get('/', function(req, res) {
	res.send("<html><body>Bem vindo</body></html>")
})

app.get('/contatos', function(req, res){
	res.json(rf.contatos);
})

app.listen(rf.porta, function(req, res){
	console.log("Servidor rodando com Express na porta: "+ rf.porta);
});
