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
 * @package    Info
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/irgalieri/websocket-monitoring
 */
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
