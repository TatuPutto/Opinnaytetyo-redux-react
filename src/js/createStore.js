import { combineReducers } from 'redux';  
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//import * as reducers from './reducers/reducers';
import { gistsManagementApp }  from './reducers/reducers';

/*const enhancers = compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
);*/

//const reducer = combineReducers(reducers);
export const store = createStore(gistsManagementApp, applyMiddleware(thunkMiddleware));  
	


