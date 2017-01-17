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
    
    logout() {
        this.props.dispatch(actions.userLogout());
        this.context.router.push('/');
    }
    
    renderGuestOrAuthenticatedUserText() {
        if(!this.props.currentUserName){
            return <a href="/auth/google"><img src="../../assets/thegoogle.png" /></a>;
        }
        return (
            <div>
                <h2>Welcome, {this.props.currentUserName}!</h2>
                <a href="#" onClick={this.logout}>Logout</a><br/>
                <Link to = "/quiz">Ready to French it up?</Link>
            </div>
        );
    }
    
    render(props) {
        return (
            <div className="welcome-page">
                <h1>FrenchX</h1><br/>
                <h3>Learn Languages Through Spaced Repetition</h3><br/>
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