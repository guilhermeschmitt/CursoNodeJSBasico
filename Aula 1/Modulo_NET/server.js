var net = require('net');
var connections = [];

var broadcast = function (message, origin) {
    connections.forEach(function (connection) {
        if (connection === origin) return;
        connection.write(message);
    });
};

net.createServer(function (connection) {
    console.log('recebeu conexao');
    connections.push(connection);
    connection.write('Bem vindo!');

    connection.on('data', function (message) {
        var command = message.toString();
        if (command.indexOf('/nickname') === 0) {
            var nickname = command.replace('/nickname ', '');
            connection.nickname = nickname;
            broadcast(connection.nickname + ' esta online');
            return;
        }
        broadcast(connection.nickname + ' > ' + message, connection);
    });

    connection.on('error', function (e) {
        console.log('error: ' + e);
    });

    connection.on('end', function () {
        broadcast(connection.nickname + ' has left!', connection);
        connections.splice(connections.indexOf(connection), 1);
    });

}).listen(5555);

console.log("Server listening in port: 5555");