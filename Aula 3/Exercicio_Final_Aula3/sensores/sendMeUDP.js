    var _              = require('c-struct'),
        dgram          = require('dgram'),
        Log            = require('../../Módulo 3 - LOG4JS/LogSystem/WriteLog')(),
        defined        = require('../../Módulo 3 - LOG4JS/LogSystem/defined')();
        ControlLog     = require('../../Módulo 3 - LOG4JS/LogSystem/ControlLog')(),
        log4js         = ControlLog.Inicializa(), 
        logfile        = log4js.getLogger('file'),
        logconsole     = log4js.getLogger ('console'),
        server         = dgram.createSocket('udp4');

var ENVIA_INF   = 1,
    RETONO_INF  = 2;

var TEMPERATURA   = 1,
    INFRAVERMELHO = 2;

var Datagrama = new _.Schema({
    id_rpc:_.type.uint32,
    id_device:_.type.uint32,
    name_device: _.type.string(20),
    device_value:_.type.uint32
});

server.on('error', function(err){
    Log.EscreveMsgInfoLog(logconsole, logfile, "server error:\n" + err);
});

server.on('listening', function() {
  const address = server.address();
  Log.EscreveMsgInfoLog(logconsole, logfile,"Server listening " + address.address + "  " + address.port);
});


server.bind({
    address: '127.0.0.1',
    port: 5555,
    exclusive: true
});

_.register('Data', Datagrama);

var buf = _.packSync('Data', {
    id_rpc: ENVIA_INF,         
    id_device: TEMPERATURA,
    name_device:"Temperatura",
    device_value:25   
});
    
var message = new Buffer(buf,"hex");

server.send(message,  0, message.length, 5556, '127.0.0.1', function(err, bytes) {
  if (err){ 
      Log.EscreveMsgErrorLog(logconsole, logfile,err);
  }else{
      Log.EscreveMsgInfoLog(logconsole, logfile,'Enviou mensagem');
      server.close();
  };
});