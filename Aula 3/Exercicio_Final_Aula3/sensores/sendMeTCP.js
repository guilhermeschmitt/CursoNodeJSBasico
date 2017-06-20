    var _              = require('c-struct'),
        net            = require('net'),
        Log            = require('../../Módulo 3 - LOG4JS/LogSystem/WriteLog')(),
        defined        = require('../../Módulo 3 - LOG4JS/LogSystem/defined')();
        ControlLog     = require('../../Módulo 3 - LOG4JS/LogSystem/ControlLog')(),
        log4js         = ControlLog.Inicializa(), 
        logfile        = log4js.getLogger('file'),
        logconsole     = log4js.getLogger ('console');

var ENVIA_INF   = 1,
    RETONO_INF  = 2;

var UMIDADE       = 3,
    INUNDACAO     = 4;

var Datagrama = new _.Schema({
    id_rpc:_.type.uint32,
    id_device:_.type.uint32,
    name_device: _.type.string(20),
    device_value:_.type.uint32
});

_.register('Data', Datagrama);

var buf = _.packSync('Data', {
    id_rpc: ENVIA_INF,         
    id_device: UMIDADE,
    name_device:"Umidade",
    device_value:25   
});
    
var message = new Buffer(buf,"hex");
var client = net.connect(5555);

client.on ('connect', function (){
    client.write(message);
    Log.EscreveMsgInfoLog(logconsole, logfile,'Enviou mensagem');
    client.destroy();
});

client.on('end', function(){
    console.log('conexao encerrada pelo servidor');
});