import { combineReducers } from 'redux';  
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './reducers/reducers';

const reducer = combineReducers(reducers);
export const store = createStore(reducer, applyMiddleware(thunkMiddleware));  
	
	
	
