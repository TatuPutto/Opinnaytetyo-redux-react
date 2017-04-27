import {combineReducers} from 'redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import activeGist  from './features/handleactivegist/duck';
import filters  from './features/listing/filtering/duck';
import gists  from './features/listing/fetchgists/duck';
import notifications from './features/notification/duck';
import user from './features/user/duck';
import createGist from './features/creategist/duck';
import editGist from './features/editgist/duck';


const rootReducer = combineReducers({
	activeGist,
	filters,
	gists,
	user,
	notifications,
	createGist,
	editGist
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
