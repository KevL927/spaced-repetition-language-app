var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var Provider = require('react-redux').Provider;
var thunk = require('redux-thunk').default;

import * as actions from './actions/actions';
import reducers from './reducers/reducers';
import routes from './components/routes';

import App from './components/App';

var store = createStore(reducers, applyMiddleware(thunk));

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app')
    )
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);

exports.store = store;