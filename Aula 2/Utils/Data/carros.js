var Carro = require('../Domains/carros');
var fs = require('fs');
var contents;
var carros = [];

contents = fs.readFileSync(__dirname + '/carros.csv').toString().split('\r\n');
contents.forEach(function (aux){
	var prep = aux.split(';');
	carros.push(new Carro(prep[0], prep[1], prep[2], prep[3], prep[4], prep[5]));
})

module.exports = carros;