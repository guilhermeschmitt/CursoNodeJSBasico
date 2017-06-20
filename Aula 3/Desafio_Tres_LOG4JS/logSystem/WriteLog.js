
var LogMensagem = function (logconsole, logfile, Msgerr){
    	logconsole.error(Msgerr);
    	logfile.error(Msgerr);
} 

module.exports  = function() {
  var controller   = {}

   controller.EscreveMsgErrorLog = function (logconsole, logfile, Msgerr){
    	logconsole.error(Msgerr);
    	logfile.error(Msgerr);
	} 

	controller.EscreveMsgInfoLog = function (logconsole, logfile, Msginfo){
    	logconsole.info(Msginfo);
    	logfile.info(Msginfo);
	}

	controller.EscreveMsgWarLog = function (logconsole, logfile, Msgwarn){
    	logconsole.warn(Msgwarn);
    	logfile.warn(Msgwarn);
	}

	controller.EscreveMsgErrorFatalLog = function (logconsole, logfile, Msgfatal){
    	logconsole.fatal(Msgfatal);
    	logfile.fatal(Msgfatal);
	}

	controller.EscreveMsgtraceLog = function (logconsole, logfile, Msgtrace){
    	logconsole.trace(Msgtrace);
    	logfile.trace(Msgtrace);
	}
  controller.EscreveMsgDebugLog = function (logconsole, logfile, MsgDebug){
      logconsole.debug(MsgDebug);
      logfile.debug(MsgDebug);
  }

	controller.ErrorClient = function(logconsole, logfile, statusCode){
	  switch(statusCode) {
        case 400:
           LogMensagem(logconsole, logfile, "Status Codigo: 400 - Bad Request");
        break;

        case 401:
           LogMensagem(logconsole, logfile, "Status Codigo: 401 - Unauthorized");
        break;

        case 402:
           LogMensagem(logconsole, logfile, "Status Codigo: 402 - Payment Required");
        break;

        case 403:
           LogMensagem(logconsole, logfile, "Status Codigo: 403 - Forbidden");
        break;

        case 404:
           LogMensagem(logconsole, logfile, "Status Codigo: 404 - Not Found");
        break;

        case 405:
           LogMensagem(logconsole, logfile, "Status Codigo: 405 - Method Not Allowed");
        break;

        case 406:
           LogMensagem(logconsole, logfile, "Status Codigo: 406 - Not Acceptable");
        break;

        case 407:
          LogMensagem(logconsole, logfile, "Status Codigo: 407 - Proxy Authentication Required");
        break;

        case 408:
           LogMensagem(logconsole, logfile, "Status Codigo: 408 - Request Timeout");
        break;

        case 409:
          LogMensagem(logconsole, logfile, "Status Codigo: 409 - Conflict");
        break;

        case 410:
          LogMensagem(logconsole, logfile, "Status Codigo: 410 - Gone");
        break;

        case 411:
          LogMensagem(logconsole, logfile, "Status Codigo: 411 - Length Required");
        break;

        case 412:
         LogMensagem (logconsole, logfile, "Status Codigo: 412 - Precondition Failed");
        break;

        case 413:
          LogMensagem(logconsole, logfile, "Status Codigo: 413 - Request Entity Too Large");
        break;

        case 414:
          LogMensagem(logconsole, logfile, "Status Codigo: 414 - Request-URI Too Long");
        break;

        case 415:
          LogMensagem(logconsole, logfile, "Status Codigo: 415 - Unsupported Media Type");
        break;

        case 416:
          LogMensagem(logconsole, logfile, "Status Codigo: 416 - Requested Range Not Satisfiable");
        break;

        case 417:
          LogMensagem(logconsole, logfile,"Status Codigo: 417 -Expectation Failed");
        break;
        
        case 500:
         LogMensagem(logconsole, logfile,"Status Codigo: 500 - Bad Request");
        break;

        case 501:
          LogMensagem(logconsole, logfile,"Status Codigo: 501 - Internal Server Error");
        break;

        case 502:
          LogMensagem(logconsole, logfile,"Status Codigo: 502 - Not Implemented");
        break;

        case 503:
          LogMensagem(logconsole, logfile,"Status Codigo: 503 - Service Unavailable");
        break;

        case 504:
          LogMensagem(logconsole, logfile,"Status Codigo: 504 - Gateway Timeout");
        break;

        case 505:
          LogMensagem(logconsole, logfile,"Status Codigo: 505 - Bad Request");
        break;

        case 511:
          LogMensagem(logconsole, logfile,"Status Codigo: 511 - HTTP Version Not Supported");
        break;

       default:
          LogMensagem(logconsole, logfile,"Network Authentication Required");
        break;
      }
	}
	return controller ;
}