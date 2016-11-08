var React = require('react');
var ReactDOM = require('react-dom');

var App = function () {
        return (
            <div className="welcome-page">
                <h1>FrenchX</h1><br/>
                <h3>Learn Languages Through Spaced Repetition</h3><br/>
                <input type="button" value="Register/Login"></input>
            </div>
        );
    };

module.exports = App;