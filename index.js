var express = require('express');
var browserify = require('browserify');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var jsx = require('node-jsx');
var app = express();
var minify = require('express-minify');

jsx.install();


var Container = require('./src/components/container.jsx');

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
        .page-wrapper {
          min-height: 180px;
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
        id: 'container',
        dangerouslySetInnerHTML: {
          __html: ReactDOMServer.renderToString(React.createElement(Container, null))
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

var server = app.listen(process.env.npm_package_config_port, function() {
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});
