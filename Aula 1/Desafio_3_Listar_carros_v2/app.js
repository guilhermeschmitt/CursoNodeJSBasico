var pegarCarro = require('./carrosService');
var teclado = require('./teclado');

teclado.aoDigitar(function (linha){
	pegarCarro(linha);
});