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

export function fetchGistsOnEnter() {
	return store.dispatch(fetchGists());
}


export function exchangeCodeToToken(nextState) {
	let code = location.href.split('?')[1].split('&')[0].split('=')[1].split('/')[0];
	code = code.substring(0, code.length - 1);
	console.log(code);
	
	return store.dispatch(fetchAccessToken(code));
}

