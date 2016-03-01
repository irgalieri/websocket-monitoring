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
 * @package    RealTimeChart
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/irgalieri/websocket-monitoring
 */
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
