import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as actions from '../actions/actions';

class App extends Component {
    componentDidMount() {
        let access_token = this.props.location.query.access_token, 
            userId = this.props.location.query.userId, 
            userName = this.props.location.query.userName;
            this.props.dispatch(actions.createNewUserSuccess(access_token, userId, userName));
    }
    
    logout() {
        this.props.dispatch(actions.userLogout());
        browserHistory.push('/');
    }
    
    renderGuestOrAuthenticatedUserText() {
        if(!this.props.currentUserName){
            return <a href="/auth/google"><div id="google-signin-button"></div></a>;
        }
        return (
            <div>
                <h2>Welcome, {this.props.currentUserName.toUpperCase()}!</h2>
                <a className="link sign-out" href="#" onClick={this.logout.bind(this)}><i className="fa fa-sign-out fa-1x" aria-hidden="true"></i>Logout</a><br/>
                <Link to = "/quiz" className="link start-button">Start French'en Now!</Link>
            </div>
        );
    }
    
    render(props) {
        return (
            <div id="welcome-page">
                <p id="title">French-X</p><br/>
                <p id="subtitle">Learn French Using Spaced Repetition</p><br/>
                {this.renderGuestOrAuthenticatedUserText()}
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