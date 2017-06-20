var PORT = 33333;
var HOST = '127.0.0.1';
var dgram = require('dgram');
var teclado = require('../Utils/teclado');
var options = process.argv.slice(2);

if (options.length < 1) {
    console.log("Digine seu nickname - exit\n")
    return;
}

var message = new Buffer("nickname " + options[0]);
var client = dgram.createSocket('udp4');

client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
});

client.on('message', function (message, remote) {
    var command = message.toString();
    if (command.search('@') === 0) {
        client.send(message, 0, message.length, remote.port, remote.host, function (err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + HOST + ':' + PORT);
        });
    } else {
        console.log(remote.address + ':' + remote.port + ' - ' + message);
    }
});

client.on('error', function (err) {
    console.log(`server error:\n${err.stack}`);
    server.close();
});


teclado.aoDigitar(function (linha) {
    if (!linha) return;
    linha = linha.toString().replace(/\n/, '');
    client.send(linha, 0, linha.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to1 ' + HOST + ':' + PORT);
    });


});