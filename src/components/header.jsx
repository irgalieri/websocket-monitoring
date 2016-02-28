var React = require('react');
var Header = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default navbar-static-top active navbar-inverse" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">{this.props.title}</a>
                </div>
            </nav>
        );
    }
});
module.exports = Header;
