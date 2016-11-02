import { fetchSelectedGist, fetchGists, fetchMoreGists, fetchAccessToken, shouldFetch, 
		selectFetchMethod } from './actions/actions';

import { store } from './createStore';

export 


//Haetaan gist näkymään saavuttaessa
function fetchSelectedGistOnEnter(nextState) {
	let gistId = nextState.params.gistId;
	let state = store.getState();

	//Haetaan gist, jos tilaan ei ole tallennettu gistiä
	//tai käyttäjän pyytämä gist ei vastaa tilaan tallennettua gist.
	if(!state.activeGist.gist.hasOwnProperty('id') || state.activeGist.gistId !== gistId) {
		return store.dispatch(fetchSelectedGist(gistId));
	}
}




export function fetchGistsOnEnter(nextState) {
	console.log(nextState);
	//let fetchMethod = nextState.params.fetchMethod;
	let fetchMethod = nextState.location.pathname.substring(1);

	if(fetchMethod == null) {
		fetchMethod = 'gists';
	}

	if(fetchMethod.startsWith('discover') || typeof nextState.params.page === 'number') {
		return store.dispatch(fetchMoreGists(nextState.params.page));
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
	

