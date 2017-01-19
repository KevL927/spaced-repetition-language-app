import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

class Quiz extends Component {
    
    logout() {
        this.props.dispatch(actions.userLogout());
        browserHistory.push('/');
    }
    
    renderLogoutButton() {
        if (this.props.currentUserId) {
            return <div><a className="link sign-out" href="#" onClick={this.logout.bind(this)}><i className="fa fa-sign-out fa-1x" aria-hidden="true"></i>Logout</a></div>;
        } else {
            return <div className="filler"></div>;
        }
    }
    
    render() {
        return (
            <div id="header">
                {this.renderLogoutButton()}
                <p id="title">French-X</p>
                {this.props.children}
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId
    };
}

export default connect(mapStateToProps)(Quiz);