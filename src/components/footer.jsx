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
