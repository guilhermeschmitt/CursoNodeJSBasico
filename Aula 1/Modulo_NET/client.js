var net = require('net');
var teclado = require('../Utils/teclado');

var client = net.connect(5555);
client.on('connect', function () {
    client.write('Novo usuario no sistema!');
});
client.on('data', function (message) {
    console.log(message.toString());
});
client.on('end', function () {
    process.exit();
});

teclado.aoDigitar(function (linha) {
    if (!linha) return;
    linha = linha.toString().replace(/\n/, '');
    client.write(linha);
});
