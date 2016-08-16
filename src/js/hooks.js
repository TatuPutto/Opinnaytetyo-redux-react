import { fetchSelectedGist, fetchGists } from './actions/actions';

import { store } from './createStore';

export function fetchSelectedGistOnEnter(nextState) {
	let gistId = nextState.params.gistId;
	
	return store.dispatch(fetchSelectedGist(gistId));
}

export function fetchGistsOnEnter() {
	return store.dispatch(fetchGists());
}

