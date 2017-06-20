var _              = require('c-struct'),
net            = require('net'),
Log            = require('../../Módulo 3 - LOG4JS/LogSystem/WriteLog')(),
defined        = require('../../Módulo 3 - LOG4JS/LogSystem/defined')();
ControlLog     = require('../../Módulo 3 - LOG4JS/LogSystem/ControlLog')(),
log4js         = ControlLog.Inicializa(), 
logfile        = log4js.getLogger('file'),
logconsole     = log4js.getLogger ('console'),
dgram          = require('dgram'),
server         = dgram.createSocket('udp4'),
request        = require('request'),
require('../ServidorWeb_database/database.js')('mongodb://localhost/Devices'),
controller     = require('../ServidorWeb_database/controllerDatabase.js')();

var ENVIA_INF   = 1,
    RETONO_INF = 2;

var TEMPERATURA   = 1,
UMIDADE       = 2,
INUNDACAO     = 3,
INFRAVERMELHO = 4;

var Datagrama1 = new _.Schema({
    id_rpc:_.type.uint32,
    message: _.type.string(30),
});

var Datagrama2 = new _.Schema({
    id_rpc:_.type.uint32,
    id_device:_.type.uint32,
    name_device: _.type.string(20),
    device_value:_.type.uint32
});


var req = function(device){
   request.post('http://127.0.0.1:3000/device', {
      form:device
  })
   .on('response', function(response) {
        Log.EscreveMsgInfoLog(logconsole, logfile,response.statusCode);
    })
   .on('error', function(err) {
      Log.EscreveMsgInfoLog(logconsole, logfile, err);
  })
}

net.createServer(function(connection){
    Log.EscreveMsgInfoLog(logconsole, logfile, "Recebeu conexão! Bem vindo!");

    connection.on('data', function(message){
        _.register('Data2', Datagrama2);
        var obj   = _.unpackSync('Data2',  message);

        Log.EscreveMsgInfoLog(logconsole, logfile,"Mensagem recebida: \n");
        Log.EscreveMsgInfoLog(logconsole, logfile, "id_rpc: "       + obj.id_rpc);
        Log.EscreveMsgInfoLog(logconsole, logfile, "id_device: "    + obj.id_device);
        Log.EscreveMsgInfoLog(logconsole, logfile, "name_device: "  + obj.name_device);
        Log.EscreveMsgInfoLog(logconsole, logfile, "device_value: " + obj.device_value);
        console.log("TCP");
        controller.save(obj.id_rpc, obj.id_device);
        req(obj);
    });

    connection.on('error', function(e){
        Log.EscreveMsgInfoLog(logconsole, logfile, "server error:\n" + e);
    });

    connection.on('end', function(){
        console.log("FIM");
    });
}).listen(5555);



server.on('error', function(err){
    Log.EscreveMsgInfoLog(logconsole, logfile, "server error:\n" + err);
});

server.on('message', function(msg, rinfo){

    _.register('Data2', Datagrama2);
    var obj   = _.unpackSync('Data2',  msg);

    Log.EscreveMsgInfoLog(logconsole, logfile,"Mensagem recebida: \n");
    Log.EscreveMsgInfoLog(logconsole, logfile, "id_rpc: "       + obj.id_rpc);
    Log.EscreveMsgInfoLog(logconsole, logfile, "id_device: "    + obj.id_device);
    Log.EscreveMsgInfoLog(logconsole, logfile, "name_device: "  + obj.name_device);
    Log.EscreveMsgInfoLog(logconsole, logfile, "device_value: " + obj.device_value);
    Log.EscreveMsgInfoLog(logconsole, logfile,"IP: " + rinfo.address + " Port: " + rinfo.port);
    console.log("UDP");
    controller.save(obj.id_rpc, obj.id_device);
    req(obj);   
});

server.on('listening', function() {
  const address = server.address();
  Log.EscreveMsgInfoLog(logconsole, logfile,"Server listening " + address.address + "  " + address.port);
});

server.bind({
    address: '127.0.0.1',
    port: 5556,
    exclusive: true
});