import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/reducers';

export default createStore(reducers, applyMiddleware(thunk));