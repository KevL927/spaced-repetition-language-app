import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/actions';

class App extends Component {
    componentDidMount() {
        let access_token = this.props.location.query.access_token, 
            userId = this.props.location.query.userId, 
            userName = this.props.location.query.userName;
            this.props.dispatch(actions.createNewUserSuccess(access_token, userId, userName));
    }
    
    renderGuestOrAuthenticatedUserText() {
        if(!this.props.currentUserName){
            return <a href="/auth/google"><div id="google-signin-button"></div></a>;
        }
        return (
            <div id="welcome-text">
                <p>Welcome, {this.props.currentUserName.toUpperCase()}!</p>
                <Link to = "/quiz" className="link start-button">Start French'en Now!</Link>
            </div>
        );
    }
    
    render() {
        return (
            <div>
                <div id="welcome-page">
                <p id="subtitle">Learn French Using Spaced Repetition</p><br/>
                {this.renderGuestOrAuthenticatedUserText()}
            </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

let mapStateToProps = state => {
    return {
        currentUserName: state.currentUserName,
        currentUserId: state.currentUserId,
        isAuthenticated: state.isAuthenticated
    };
}

export default connect(mapStateToProps)(App);  