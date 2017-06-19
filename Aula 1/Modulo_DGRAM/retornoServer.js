var dgram = require('dgram');

module.exports = function (host, port, msg) {
    var message = new Buffer(msg);
    var client = dgram.createSocket('udp4');

    client.send(message, 0, message.length, port, host, function (err, bytes) {
        if (err) throw err;
        client.close();
    });
}