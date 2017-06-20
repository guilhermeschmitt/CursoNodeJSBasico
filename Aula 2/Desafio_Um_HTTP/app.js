var carrosService = require('../Utils/Service/carrosService');
var teclado = require('../Utils/teclado');
var carrosHttp = require('../Utils/Service/carrosHttp');
var opcao = process.argv.slice(2);
if (opcao[0] === '-http') {
    console.log("Http Mode");
    carrosHttp.listen(3000, function () {
        console.log('Servidor Hello World rodando!');
    });
    return;
}

console.log('Keyboard mode');
teclado.aoDigitar(function (linha) {
    if (linha === '/q') process.exit();
    carrosService.exibirCarrosPorModelo(linha);


});
