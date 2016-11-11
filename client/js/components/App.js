var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = require('react-router').Link;

var createNewUserSuccess = require('../actions/actions').createNewUserSuccess;
var userLogout = require('../actions/actions').userLogout;

var App = React.createClass({
    
    componentDidMount: function() {
        var access_token = this.props.location.query.access_token, 
            userId = this.props.location.query.userId, 
            userName = this.props.location.query.userName;
            this.props.retrieveUserInfo(access_token, userId, userName);

    },
    
    logout: function() {
        this.props.logOutUser();
       this.context.router.push('/');
    },
    
    render: function (props) {
        if(!this.props.currentUserName){
            return (
                <div className="welcome-page">
                    <h1>FrenchX</h1><br/>
                    <h3>Learn Languages Through Spaced Repetition</h3><br/>
                    <a href="/auth/google"><img src="../../assets/thegoogle.png" /></a>
                </div>
            ); 
        }
        else{
            return (
                <div className="welcome-page">
              <h2>Welcome, {this.props.currentUserName}!</h2>
              <a href="#" onClick={this.logout}>Logout</a>
                    <h1>FrenchX</h1><br/><Link to = "/quiz">Ready to French it up? </Link>
                    <h3>Learn Languages Through Spaced Repetition</h3><br/>
                </div>
            );
        }
    }
});

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps (state) {
    console.log(state);
    return {
        currentUserName: state.currentUserName,
        currentUserId: state.currentUserId,
        isAuthenticated: state.isAuthenticated,
        
    };
}

function mapDispatchToProps (dispatch) {
    return {
        retrieveUserInfo: function(access_token, userId, userName) {
            dispatch(createNewUserSuccess(access_token, userId, userName));
        },
        logOutUser: function () {
            dispatch(userLogout());
        }
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);