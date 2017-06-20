var _ = require('c-struct'),
    net = require('net'),
    Log = require('../Desafio_Tres_LOG4JS/logSystem/WriteLog')(),
    defined = require('../Desafio_Tres_LOG4JS/logSystem/defined')(),
    ControlLog = require('../Desafio_Tres_LOG4JS/logSystem/ControlLog')(),
    log4js = ControlLog.Inicializa(),
    logfile = log4js.getLogger('file'),
    logconsole = log4js.getLogger('console');

var ENVIA_INF = 1,
    RETONO_INF = 2;

var TEMPERATURA = 1,
    UMIDADE = 2,
    INUNDACAO = 3,
    INFRAVERMELHO = 4;

var Datagrama1 = new _.Schema({
    id_rpc: _.type.uint32,
    message: _.type.string(30),
});

var Datagrama2 = new _.Schema({
    id_rpc: _.type.uint32,
    id_device: _.type.uint32,
    name_device: _.type.string(20),
    device_value: _.type.uint32
});

net.createServer(function (connection) {
    Log.EscreveMsgInfoLog(logconsole, logfile, "Recebeu conexão! Bem vindo!");

    connection.on('data', function (message) {
        _.register('Data2', Datagrama2);
        var obj = _.unpackSync('Data2', message);

        Log.EscreveMsgInfoLog(logconsole, logfile, "Mensagem recebida: \n");
        Log.EscreveMsgInfoLog(logconsole, logfile, "id_rpc: " + obj.id_rpc);
        Log.EscreveMsgInfoLog(logconsole, logfile, "id_device: " + obj.id_device);
        Log.EscreveMsgInfoLog(logconsole, logfile, "name_device: " + obj.name_device);
        Log.EscreveMsgInfoLog(logconsole, logfile, "device_value: " + obj.device_value);


        _.register('Data1', Datagrama1);

        var buf = _.packSync('Data1', {
            id_rpc: RETONO_INF,
            message: "Mensagem Ok - id: " + obj.id_device
        });

        var message = new Buffer(buf, "hex");

        connection.write(message);
        Log.EscreveMsgInfoLog(logconsole, logfile, 'Enviou mensagem');
    })

    connection.on('error', function (e) {
        Log.EscreveMsgInfoLog(logconsole, logfile, "server error:\n" + e);
    });

    connection.on('end', function () {
        console.log("FIM");
    });
}).listen(5555);