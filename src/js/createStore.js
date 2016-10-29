import { combineReducers } from 'redux';  
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { activeGist }  from './reducers/activeGist';
import { gists }  from './reducers/gists';
import { pagination }  from './reducers/pagination';
import { user }  from './reducers/user';

/*
//Yhdistetään reducerit
const rootReducer = combineReducers({
	activeGist,
	gists,
	pagination,
	user
});*/


function rootReducer(state = {}, action) {
	return {
		activeGist: activeGist(state.activeGist, action),
		gists: gists(state.gists, action),
		pagination: pagination(state.pagination, action),
		user: user(state.user, action)
	};
}



//Luodaan store
export const store = createStore(
	rootReducer, 
	applyMiddleware(thunkMiddleware)
);  
	


