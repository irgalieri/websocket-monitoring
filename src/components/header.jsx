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
