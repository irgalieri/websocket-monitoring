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
 * @package    Index
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/irgalieri/websocket-monitoring
 */
var express = require('express');
var browserify = require('browserify');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var jsx = require('node-jsx');
var app = express();
var minify = require('express-minify');

jsx.install();


var Lodding = require('./src/components/lodding.jsx');

app.use(minify());
app.use(express.static(__dirname + '/bower_components'));

app.use('/bundle.js', function(req, res) {
  res.setHeader('content-type', 'application/javascript');
  browserify('./src/app.js', {
    debug: process.env.npm_package_config_debug
  })
  .transform('reactify', {stripTypes: true, es6: true})
  .transform('uglifyify', {global: true})
  .bundle()
  .pipe(res);
});

app.use('/bundle.css', function(req, res) {
  res.setHeader('content-type', 'text/css');
  res.send(`
        #lodding {
            margin:0px auto;
            display:block;
        }
        .btn-nacho {
            float: right;
            min-width: 70px;
        }
        .fork {
          padding-top: 5px !important;
          margin-right: 5px !important;
          padding-bottom: 5px !important;
        }
        .header-nacho {
            margin-bottom: 0px;
        }
        .navbar-copy {
            padding: 15px;
            position: absolute;
            width: 100%;
            left: 0;
            text-align: center;
            margin: auto;
            color: #9d9d9d;
        }
        .navbar-copy a {
            padding-right: 10px;
            text-decoration: none;
            color: black;
        }
        .navbar-copy a:hover {
            padding-right: 10px;
            text-decoration: none;
            color: orange;
        }
  `);
});

app.use('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(ReactDOMServer.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({
        id: 'wrapper',
        dangerouslySetInnerHTML: {
          __html: ReactDOMServer.renderToString(React.createElement(Lodding, null))
        }
      }),
      React.DOM.script({
        src: '/jquery/dist/jquery.min.js'
      }),
      React.DOM.script({
        src: '/bootstrap/dist/js/bootstrap.min.js'
      }),
      React.DOM.script({
        src: '/metisMenu/dist/metisMenu.min.js'
      }),
      React.DOM.script({
        src: '/raphael/raphael-min.js'
      }),
      React.DOM.script({
        src: '/morrisjs/morris.min.js'
      }),
      React.DOM.script({
        src: '/morrisjs/morris.min.js'
      }),
      React.DOM.script({
        src: '/morrisjs/morris.min.js'
      }),
      React.DOM.script({
        src: '/startbootstrap-sb-admin-2/dist/js/sb-admin-2.js'
      }),
      React.DOM.script({
        src: '/bundle.js'
      })
    )
  ));
});

var server = app.listen(process.env.npm_package_config_webport, function() {
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});
