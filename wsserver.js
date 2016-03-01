#!/usr/bin/env node
/**
 * WebSocket Monitoring
 * Copyright (C) 2016  Ignacio R. Galieri
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @category   Library
 * @package    WsServer
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/irgalieri/websocket-monitoring
 */

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
