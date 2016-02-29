var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var Info = require('./info.jsx');
var RealTimeChart = require('./realtimechart.jsx');
var Container = React.createClass({
    render: function(){
        return (
            <div>
                <Header title="WS Monitoring"/>
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Drash Board</h1>
                        </div>
                    </div>
                    <RealTimeChart title="Memory Usage" id="memory" label="Memory Usage:" maxxpoints="100" color="ffa500"/>
                    <RealTimeChart title="CPU Usage" id="cpu" label="CPU Usage:" maxxpoints="100" color="199cef"/>
                    <Info />
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
