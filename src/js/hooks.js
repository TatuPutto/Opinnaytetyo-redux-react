import { fetchSelectedGist, fetchGists, fetchAccessToken, shouldFetch, 
		selectFetchMethod } from './actions/actions';

import { store } from './createStore';

export function fetchSelectedGistOnEnter(nextState) {
	let gistId = nextState.params.gistId;
	let state = store.getState();

	if(state.activeGist.gistId !== gistId) {
		return store.dispatch(fetchSelectedGist(gistId));
	}
}

export function fetchGistsOnEnter(nextState) {
	console.log(nextState);
	//let fetchMethod = nextState.params.fetchMethod;
	let fetchMethod = nextState.location.pathname.substring(1);
	console.log(fetchMethod);
	if(fetchMethod == null) {
		fetchMethod = 'gists';
	}
	 
	if(shouldFetch(store.getState(), fetchMethod)) {
		return store.dispatch(fetchGists(fetchMethod));
	}
}

export function login() {
	//Yritetään hakea käyttäjätietoja local storagesta
	//let userInfo = getUserInfoFromStorage();
	window.location.href = 'http://localhost:8080/Opinnaytetyo_spring_react/authorize';
}
	

