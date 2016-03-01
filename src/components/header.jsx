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
 * @package    Header
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/irgalieri/websocket-monitoring
 */
var React = require('react');
var Header = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default navbar-static-top active navbar-inverse header-nacho" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">{this.props.title}</a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a className="fork" href="https://github.com/irgalieri/websocket-monitoring" title="Fork me on GitHub" target="_blank">
                            <span className="fa-stack fa-lg" alt="Fork me on GitHub">
                                <i className="fa fa-square-o fa-stack-2x"></i>
                                <i className="fa fa-code-fork fa-stack-1x"></i>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});
module.exports = Header;
