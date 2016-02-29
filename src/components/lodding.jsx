var React = require('react');
var Header = React.createClass({
    render: function(){
        return (
            <div>
                <img id="lodding" src="http://www.skiscool.eu/img/gangnamstyle.gif" alt="Lodding..."/>
                <link href="bundle.css" rel="stylesheet" type="text/css"/>
            </div>
        );
    }
});
module.exports = Header;
