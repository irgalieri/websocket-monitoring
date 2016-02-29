#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
var os = require('os');

var server = http.createServer(function(request, response) {
    console.log(
        (new Date()) + ' Received request for ' + request.url
    );
    response.writeHead(404);
    response.end();
});

server.listen(process.env.npm_package_config_wsport, function() {
    console.log(
        (new Date()) + ' Server is listening on port ' + process.env.npm_package_config_wsport
    );
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

var interval = null;

wsServer.on('request', function(request) {
    var protocol = null;
    if (process.env.npm_package_config_protocol != 'none') {
        protocol = process.env.npm_package_config_protocol;
    }

    var connection = request.accept(protocol, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            if (message.utf8Data == "INIT") {
                interval = setInterval(function() {
                    var tam = os.cpus().length;
                    var cpus = os.cpus();
                    var user = 0;
                    var sys = 0;
                    var idle = 0;

                    for (var i=0; i < tam; i++) {
                        user = user + cpus[i].times.user;
                        sys = sys + cpus[i].times.sys;
                        idle = idle + cpus[i].times.idle;
                    }

                    var newelement = {
                        timestamp: new Date().getTime(),
                        memusage: Math.round((((os.totalmem() - os.freemem()) / os.totalmem())  * 100)),
                        memfree: Math.round(((os.freemem() / os.totalmem())  * 100)),
                        cpuuser: user / tam,
                        cpusys: sys / tam,
                        cpuidle: idle / tam,
                        model: cpus[0].model
                    };
                    connection.sendUTF(JSON.stringify(newelement));
                }, process.env.npm_package_config_heartbeat);
            } else if (message.utf8Data == "END") {
                clearInterval(interval);
            } else {
                connection.sendUTF("ERROR");
            }
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
