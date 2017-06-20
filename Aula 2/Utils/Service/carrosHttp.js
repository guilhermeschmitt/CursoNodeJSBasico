var http = require('http');
var carros = require('../Data/carros');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
    });
    res.write('<h1>Carros:</h1>');
    carros.forEach(function (aux) {
        res.write('<h2>' + 'Marca : ' + aux.marca + '</h2>');
        res.write('<h5>' + 'Modelo : ' + aux.modelo + '</h5>');
        res.write('<h5>' + 'Ano : ' + aux.ano + '</h5>');
        res.write('<h5>' + 'Cor : ' + aux.cor + '</h5>');
        res.write('<h5>' + 'Versao : ' + aux.versao + '</h5>');
        res.write('<h5>' + 'Preco : ' + aux.preco + '</h5>');
    })
    res.end();
})

module.exports = server;