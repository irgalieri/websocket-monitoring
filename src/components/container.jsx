var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var Info = require('./info.jsx');
var Container = React.createClass({
    render: function(){
        return (
            <div id="wrapper">
                <Header title="WS Monitoring"/>
                <div className="page-wrapper">
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
