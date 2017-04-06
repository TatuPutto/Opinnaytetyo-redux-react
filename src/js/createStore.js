import {combineReducers} from 'redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {activeGist}  from './reducers/activegist';
import {filters}  from './reducers/filters';
import {gists}  from './reducers/gists';
//import {notifications} from './reducers/notifications';
import notification from './features/notification/duck';
import {pagination}  from './reducers/pagination';
import {user}  from './reducers/user';
import {miscActions}  from './reducers/miscactions';

function rootReducer(state = {}, action) {
	return {
		activeGist: activeGist(state.activeGist, action),
		filters: filters(state.filters, action),
		gists: gists(state.gists, action),
		notifications: notification(state.notification, action),
		pagination: pagination(state.pagination, action),
		user: user(state.user, action),
		miscActions: miscActions(state.miscActions, action),
	};
}

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
