require('./database.js')('mongodb://localhost/test');
var controller = require('./controller')();
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var contatos = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Salva os contatos no banco
app.post('/contatos', function(req, res){
	controller.save(req.body.id, req.body.nome, req.body.email);
	res.send("OK")
});

//Faz o update de UM contato
app.put('/contatos/:id', function(req, res){ 
	var aux = {};
		aux.id = req.body.id;
		aux.nome = req.body.nome;
		aux.email = req.body.email;
		controller.updateContact(req.params.id, aux);
		res.send("OK");
});

//TODO Nao esta enviando o objeto JSON
//Porém, está funcionando :)
app.delete('/contatos/:id', function(req, res){
	controller.removeContact(req.params.id);
	res.send("OK");

	//res.json(contatos);
	//Deleta o contato com determinado ID
});

//TODO Nao esta enviando o objeto JSON
app.get('/contatos', function(req, res){
	var contacts = controller.findAll();
	res.send(contacts);
})

//TODO Nao esta enviando o objeto JSON
app.get('/contatos/:id', function(req, res){
	var contact = controller.findOne(req.params.id);
	res.send(contact);
})

app.listen(3000,function(){
	console.log("Servidor escutando 3000")
}); 