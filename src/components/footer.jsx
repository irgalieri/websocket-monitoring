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
 * @package    Footer
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/irgalieri/websocket-monitoring
 */
var React = require('react');
var Footer = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <p className="nav navbar-nav navbar-copy">
                    Code By <a href="http://elnachonerd.com">NachoNerd</a>
                    Template by <a href="http://startbootstrap.com/">Start Bootstrap</a>
                </p>
            </nav>
        );
    }
});
module.exports = Footer;
