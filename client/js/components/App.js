var React = require('react');
var ReactDOM = require('react-dom');
var redirectLogin = require('../actions/actions').redirectLogin;
var connect = require('react-redux').connect



var App = React.createClass({
    
    redirectLoginUrl: function (event) {
        event.preventDefault();
        this.props.onSubmit();
    },
    
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

//<input type="submit" className="googleSignIn" onClick={this.redirectLoginUrl} value="Login with Google"></input>


function mapDispatchToProps (dispatch) {
    return {
        onSubmit: function() {
            dispatch(redirectLogin());
        }
    }
}

module.exports = connect(null, mapDispatchToProps)(App);