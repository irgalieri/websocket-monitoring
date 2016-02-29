var React = require('react');

var RealTimeChart = React.createClass({
    componentDidMount() {
        var self = this;

        function updateLiveGraph(mainGraph, obj) {
            var result = obj.props.points;
            if ( obj.props.points.length <=0 ) {
                var result = [
                    {
                        timestamp: new Date().getTime(),
                        value: 0
                    }
                ];
            }
            mainGraph.setData(result);
        }

        result = this.props.points;
        if ( result.length <=0 ) {
            var result = [
                {
                    timestamp: new Date().getTime(),
                    value: 0
                }
            ];
        }
        var mainGraph = Morris.Line({
            element: "morris-area-chart-" + this.props.id,
            data: result,
            xkey: 'timestamp',
            ykeys: ['value'],
            postUnits: ' %',
            lineColors: ['#' + this.props.color],
            labels: [this.props.label],
            lineWidth: 3,
            pointSize: 2,
            resize: true
        });

        setInterval(function() { updateLiveGraph(mainGraph, self); }, 2000);
    },
    render: function(){
        return (
            <div className="col-lg-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <i className="fa fa-area-chart"></i> {this.props.title}
                    </div>
                    <div className="panel-body">
                        <div id={"morris-area-chart-" + this.props.id}></div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = RealTimeChart;
