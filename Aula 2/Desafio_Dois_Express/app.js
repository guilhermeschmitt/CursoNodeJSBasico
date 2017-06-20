var carrosService = require('../Utils/Service/carrosService');
var teclado = require('../Utils/teclado.js');
var carrosHttp = require('../Utils/Service/carrosHttp');
var carros = require('../Utils/Data/carros');
var carrosExpress = require('./xpress/carrosExpress.js');
var express = require('express');
var app = express();

var opcao = process.argv.slice(2);
if (opcao[0] === '-http') {
    console.log("Http Mode");
    carrosHttp.listen(3000, function () {
        console.log('Servidor Hello World rodando!');
    });
    return;
}
else if (opcao[0] === '-api') {
    carrosExpress.listen(3000, function (req, res) {
        console.log('API mode');
    });
    return;
};

console.log('Keyboard mode');
teclado.aoDigitar(function (linha) {
    if (linha === '/q') process.exit();
    carrosService.exibirCarrosPorModelo(linha);


});
