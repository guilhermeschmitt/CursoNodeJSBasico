var carros = require('../Data/carros');

var exibirCarros = function () {
	carros.forEach(function (carro) {
		console.log(carro);
	});
};


var exibirCarrosPorModelo = function (modelo) {
	var carrosEncontrados = [];

	carros.forEach(function (aux) {
		var valor = aux.modelo.localeCompare(modelo);
		if (aux.modelo.toString() === modelo.toString()) {
			carrosEncontrados.push(aux);
		};
	})

	if (carrosEncontrados.length === 0) {
		console.log("Nenhum carro foi encontrado!");
		return;
	}

	carrosEncontrados.forEach(function (carro) {
		console.log(carro);
	});
};


module.exports = {
	exibirCarros: exibirCarros,
	exibirCarrosPorModelo: exibirCarrosPorModelo
};