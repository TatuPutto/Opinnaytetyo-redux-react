import { fetchSelectedGist, fetchGists, fetchAccessToken } from './actions/actions';

import { store } from './createStore';

export function fetchSelectedGistOnEnter(nextState) {
	let gistId = nextState.params.gistId;
	let state = store.getState();

	if(state.activeGist.gistId !== gistId) {
		return store.dispatch(fetchSelectedGist(gistId));
	}
	else {
		console.log('Valittu gist on jo aktiivinen');
	}
}

export function fetchGistsOnEnter(nextState) {
	let searchMethod = nextState.params.searchMethod;
	if(searchMethod == null) {
		searchMethod = 'gists';
	}
	
	return store.dispatch(fetchGists(nextState.params.searchMethod));
}