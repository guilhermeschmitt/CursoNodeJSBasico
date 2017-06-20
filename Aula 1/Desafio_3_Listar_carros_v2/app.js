var pegarCarro = require('./carrosService');
var teclado = require('../Utils/teclado');

teclado.aoDigitar(function (linha){
	pegarCarro(linha);
});