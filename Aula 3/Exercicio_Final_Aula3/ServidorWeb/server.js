var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
http = require('http').Server(app),
io = require('socket.io')(http),
fs = require('fs'),
Log            = require('../../Módulo 3 - LOG4JS/LogSystem/WriteLog')(),
defined        = require('../../Módulo 3 - LOG4JS/LogSystem/defined')(),
ControlLog     = require('../../Módulo 3 - LOG4JS/LogSystem/ControlLog')(),
log4js         = ControlLog.Inicializa(),
logfile        = log4js.getLogger('file'),
logconsole     = log4js.getLogger ('console');
require('../ServidorWeb_database/database.js')('mongodb://localhost/Devices'),
controller     = require('../ServidorWeb_database/controllerDatabase.js')();  

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function index(req, res){
 fs.readFile(__dirname + '/index.html', function(err, data){
   res.writeHead(200);
   res.end(data);
 });
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

app.post('/device', function(req, res){
	console.log(req.body);
	io.emit('devices', req.body);
})

app.get('/device', function(req, res){
    controller.findAll(req, res);
})

io.on('connection', function(socket){
  Log.EscreveMsgInfoLog(logconsole, logfile, 'a user connected');

  socket.on('disconnect', function(){
    Log.EscreveMsgInfoLog(logconsole, logfile, 'user disconnected');
  });

});

http.listen(3000, function(){
  Log.EscreveMsgInfoLog(logconsole, logfile, 'listening on *:3000');
});