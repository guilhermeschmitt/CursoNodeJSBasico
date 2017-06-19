var carros = require('./data/carros');
module.exports = function pegarCarro(modelo){
    var resultados = [];
    modelo = modelo.toString();
	carros.forEach(function(carro){
		if(carro.modelo.toString() === modelo)
			resultados.push(carro);
	})

	if(resultados.length === 0){
		console.log("Nenhum carro foi encontrado!");
		return;
	}

	resultados.forEach(function(carro){
		console.log(carro);
	})
	return;
}