var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
    render: function () {
        return (
            <div className="welcome-page">
                <h1>FrenchX</h1><br/>
                <h3>Learn Languages Through Spaced Repetition</h3><br/>
                 <a className="googleSignIn" href="/auth/google">Login with Google</a>
            </div>
        );
    }
});

module.exports = App;