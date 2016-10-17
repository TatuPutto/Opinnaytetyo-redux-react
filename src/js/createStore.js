import { combineReducers } from 'redux';  
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { activeGist }  from './reducers/activeGist';
import { gists }  from './reducers/gists';
import { pagination }  from './reducers/pagination';
import { user }  from './reducers/user';


//Yhdistetään reducerit
const rootReducer = combineReducers({
	activeGist,
	gists,
	pagination,
	user
});

//Luodaan store
export const store = createStore(
	rootReducer, 
	applyMiddleware(thunkMiddleware)
);  
	


