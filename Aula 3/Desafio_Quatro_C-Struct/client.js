    var _              = require('c-struct'),
        net            = require('net'),
        Log = require('../Desafio_Tres_LOG4JS/logSystem/WriteLog')(),
        defined = require('../Desafio_Tres_LOG4JS/logSystem/defined')(),
        ControlLog = require('../Desafio_Tres_LOG4JS/logSystem/ControlLog')(),
        log4js         = ControlLog.Inicializa(), 
        logfile        = log4js.getLogger('file'),
        logconsole     = log4js.getLogger ('console');

var ENVIA_INF   = 1,
    RETONO_INF  = 2;

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

_.register('Data2', Datagrama2);

var buf = _.packSync('Data2', {
    id_rpc: ENVIA_INF,         
    id_device: TEMPERATURA,
    name_device:"Temperatura",
    device_value:25   
});
    
var message      = new Buffer(buf,"hex");


var client = net.connect(5555);
client.on ('connect', function (){
    client.write(message);
    Log.EscreveMsgInfoLog(logconsole, logfile,'Enviou mensagem');
});

client.on('data', function (message) {
    _.register('Data1', Datagrama1);
    var obj   = _.unpackSync('Data1',  message);
    console.log(obj);
    Log.EscreveMsgInfoLog(logconsole, logfile,"Mensagem: " + obj.message);
});

client.on('end', function(){
    console.log('conexao encerrada pelo servidor');
});