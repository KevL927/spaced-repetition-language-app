import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import Header from './Header';
import Quiz from './QuizPage';
import App from './App';

export default (
    <Router history={browserHistory} >
        <Route path="/" component={Header}>
            <IndexRoute component={App} />
            <Route path="quiz" component= {Quiz} />
        </Route>
    </Router>
);  