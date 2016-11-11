var React = require('react');
var ReactDOM = require('react-dom');
var createNewUserSuccess = require('../actions/actions').createNewUserSuccess;
var connect = require('react-redux').connect;



var App = React.createClass({
    
    componentDidMount: function() {
                 var access_token = this.props.location.query.access_token, 
             userId = this.props.location.query.userId, 
             userName = this.props.location.query.userName;
    this.props.retrieveUserInfo(access_token, userId, userName);

    },
    
    render: function (props) {
        return (
            <div className="welcome-page">
          <h2>Welcome, {this.props.currentUserName}!{this.props.location.query.userName}!</h2>
                <h1>FrenchX</h1><br/>
                <h3>Learn Languages Through Spaced Repetition</h3><br/>
                 <a className="googleSignIn" href="/auth/google">Login with Google</a>
            </div>
        );
    }
});


function mapStateToProps (state) {
    return {
        currentUserName: state.currentUserName,
        currentUserId: state.currentUserId,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        retrieveUserInfo: function(access_token, userId, userName) {
            dispatch(createNewUserSuccess(access_token, userId, userName));
        }
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);