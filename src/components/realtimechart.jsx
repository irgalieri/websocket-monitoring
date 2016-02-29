var React = require('react');

var RealTimeChart = React.createClass({
    componentDidMount() {
        var limmit = this.props.maxxpoints;

        function updateLiveGraph(mainGraph) {
            var newelement = {
                timestamp: new Date().getTime(),
                value: Math.round((Math.random() * 100))
            };
            var data = [];

            var tam = mainGraph.data.length;

            if ( tam < limmit) {
                for (i = 0; i < tam; i++) {
                    data.push(mainGraph.data[i].src);
                }
            } else {
                for (i = 1; i < tam; i++) {
                    data.push(mainGraph.data[i].src);
                }
            }

            data.push(newelement);
            mainGraph.setData(data);
        }
        var result = [
            {
                timestamp: new Date().getTime(),
                value: Math.round((Math.random() * 100))
            }
        ];
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

        setInterval(function() { updateLiveGraph(mainGraph); }, 2000);
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
