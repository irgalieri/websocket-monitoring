var React = require('react');

var Row = React.createClass({
    render: function(){
        return (
            <a href="#" className="list-group-item">
                {this.props.incoming.name}
                <span className="pull-right text-muted small">
                    <em>{this.props.incoming.value}</em>
                </span>
            </a>
        );
    }
});
var Info = React.createClass({
    render: function(){
        var rows = this.props.items.map(function(incoming){
          return (<Row key={incoming.name} incoming={incoming} />);
        });
        return (
            <div className="col-lg-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Notifications Panel
                    </div>
                    <div className="panel-body">
                        <div className="list-group">
                            {rows}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Info;
