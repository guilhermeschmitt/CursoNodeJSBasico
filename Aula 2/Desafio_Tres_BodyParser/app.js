var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var contatos = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Array.prototype.remove = function (start, end) {
    this.splice(start, end);
    return this;
}

app.get('/contatos', function (req, res) {
    res.json(contatos)
})

app.get('/contatos/:id', function (req, res) {
    contatos.forEach(function (element) {
        if (element.id === req.params.id) {
            res.json(element);
        }
    })
})

app.put('/contatos/:id', function (req, res) {
    contatos.forEach(function (aux) {
        if (aux.id === req.params.id) {
            aux.id = req.body.id;
            aux.nome = req.body.nome;
            aux.email = req.body.email;
            res.send("OK");
        }
    });
});

app.post('/contatos', function (req, res) {
    var contato = {};
    contato.id = req.body.id;
    contato.nome = req.body.nome;
    contato.email = req.body.email;
    contatos.push(contato);
    res.send("OK");
});

app.delete('/contatos', function (req, res) {
    contatos.remove(contatos.lenght - 1, 1);
    res.json(contatos);
});

app.listen(3000, function () {
    console.log("Servidor escutando 3000")
});