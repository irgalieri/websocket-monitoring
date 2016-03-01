var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var Info = require('./info.jsx');
var RealTimeChart = require('./realtimechart.jsx');
var Container = React.createClass({
    onClick: function (e) {
        var self = this;
        var update = function (obj, data) {
            var btn = obj.state.btn;
            var items = [
                {
                    name: "Model",
                    value: data.model
                },
                {
                    name: "CPU User Avg",
                    value: data.cpuuser
                },
                {
                    name: "CPU Sys Avg",
                    value: data.cpusys
                },
                {
                    name: "CPU Idle Avg",
                    value: data.cpuidle
                }
            ];
            var freepoints = obj.state.freepoints;
            var usagepoints = obj.state.usagepoints;

            if ( freepoints.length >= 100) {
                freepoints.shift();
            }

            if ( usagepoints.length >= 100) {
                usagepoints.shift();
            }

            freepoints.push(
                {
                    timestamp: data.timestamp,
                    value: data.memfree
                }
            );
            usagepoints.push(
                {
                    timestamp: data.timestamp,
                    value: data.memusage
                }
            );
            obj.setState(
                {
                    items: items,
                    btn: btn,
                    freepoints: freepoints,
                    usagepoints: usagepoints
                }
            );
        };
        e.preventDefault();
        var items = this.state.items;
        var freepoints = this.state.freepoints;
        var usagepoints = this.state.usagepoints;
        var btn = { name: "Start", classname: "btn-success"};
        if (this.state.btn.classname == "btn-success") {
            var btn = { name: "End", classname: "btn-danger"};
            connection = new WebSocket('ws://127.0.0.1:11333');
            connection.onopen = function (e) {
                connection.send('INIT');
            };
            connection.onmessage = function (e) {
                update(self, JSON.parse(e.data));
            };
        } else {
            connection.send('END');
            connection.close();
        }
        this.setState(
            {
                items: items,
                btn: btn,
                freepoints: freepoints,
                usagepoints: usagepoints
            }
        );
    },
    getInitialState: function() {
      return {
          items: [
              {
                  name: "Model",
                  value: "N/A"
              },
              {
                  name: "CPU User Avg",
                  value: 0
              },
              {
                  name: "CPU Sys Avg",
                  value: 0
              },
              {
                  name: "CPU Idle Avg",
                  value: 0
              }
          ],
          btn: {
              name: "Start",
              classname: "btn-success"
          },
          freepoints: [],
          usagepoints: []
      };
    },
    render: function(){
        var connection = null;
        return (
            <div>
                <Header title="WS Monitoring"/>
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">
                                Dash Board
                                <button
                                    onClick={this.onClick}
                                    className={"btn " + this.state.btn.classname + " btn-nacho"}>
                                    {this.state.btn.name}
                                </button>
                            </h1>
                        </div>
                    </div>
                    <RealTimeChart
                        title="Memory Usage"
                        id="memory-usage"
                        label="Memory Usage:"
                        color="ffa500"
                        points={this.state.usagepoints}/>
                    <RealTimeChart
                        title="Memory Free"
                        id="memory-free"
                        label="Memory Free:"
                        color="199cef"
                        points={this.state.freepoints}/>
                    <Info items={this.state.items}/>
                </div>
                <Footer />
                <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="bootstrap/dist/css/bootstrap-theme.min.css"/>
                <link rel="stylesheet" href="metisMenu/dist/metisMenu.min.css"/>
                <link rel="stylesheet" href="startbootstrap-sb-admin-2/dist/css/timeline.css"/>
                <link rel="stylesheet" href="startbootstrap-sb-admin-2/dist/css/sb-admin-2.css"/>
                <link href="morrisjs/morris.css" rel="stylesheet"/>
                <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
                <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
                <link href="bundle.css" rel="stylesheet" type="text/css"/>
            </div>
        );
    }
});
module.exports = Container;
