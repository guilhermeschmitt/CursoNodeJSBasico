var     ControlLog     = require('../logSystem/ControlLog')(),
    	log4js         = ControlLog.Inicializa(), 
        logfile        = log4js.getLogger('file'),
        logconsole     = log4js.getLogger ('console'),
        Log            = require('../logSystem/WriteLog')(),
        logDefined     = require('../logSystem/defined')(),
		express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		contatos = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000,function(){
	console.log("Servidor escutando 3000")
});

var requestLoop = setInterval(function(){
  ControlLog.ApagaLog(logconsole, logfile);
}, 10000);

Array.prototype.remove = function(start, end) {
  this.splice(start, end);
  return this;
}

app.get('/contatos', function(req, res){
	res.json(contatos)
	Log.EscreveMsgInfoLog(logconsole, logfile, "Mensagem informativa!\nPegou a lista de contatos");
})

app.get('/contatos/:id', function(req, res){
	contatos.forEach(function(element){
		if(element.id === req.params.id){
			res.json(element);
		}
	})
	Log.EscreveMsgInfoLog(logconsole, logfile, "Mensagem informativa!\nPegou um contato da lista");
})

app.put('/contatos/:id', function(req, res){ 
	contatos.forEach(function (aux){
		if(aux.id === req.params.id){
			aux.id = req.body.id;
			aux.nome = req.body.nome;
			aux.email = req.body.email;
			res.send("OK");
		}
	});
	Log.EscreveMsgInfoLog(logconsole, logfile, "Mensagem informativa!\nUpdate no contato: "+ req.params.id);
});

app.post('/contatos', function(req, res){
	var contato = {};
	contato.id = req.body.id;
	contato.nome  = req.body.nome;
	contato.email = req.body.email;
	contatos.push(contato);
	res.send("OK");
	Log.EscreveMsgInfoLog(logconsole, logfile, "Mensagem informativa!\nAdicionou novo contato na lista");
});

app.delete('/contatos', function(req, res){
	contatos.remove(contatos.lenght -1, 1);
	res.json(contatos);
	 Log.EscreveMsgWarLog(logconsole, logfile, "Mensagem de aviso!\nExcluiu contato da lista");
});

