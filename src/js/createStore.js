import { combineReducers } from 'redux';  
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//import * as reducers from './reducers/reducers';


//import { gistsManagementApp }  from './reducers/reducers';


import { activeGist }  from './reducers/activeGist';
import { gists }  from './reducers/gists';
import { user }  from './reducers/user';

//Yhdistetään reducerit
const rootReducer = combineReducers({
	activeGist,
	gists,
	user
});

//Luodaan store
export const store = createStore(
	rootReducer, 
	applyMiddleware(thunkMiddleware)
);  
	


