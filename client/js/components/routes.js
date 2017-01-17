import React from 'react';
import { browserHistory, Route, Router } from 'react-router';
import Quiz from './QuizPage';
import App from './App';
import Profile from './Profile';

export default (
    <Router history={browserHistory} >
        <Route path="/" component={App} />
        <Route path="/profile" component= {Profile} />
        <Route path="/quiz" component= {Quiz} />
    </Router>
);