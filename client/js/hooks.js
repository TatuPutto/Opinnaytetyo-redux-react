import {store} from './createStore';
import {fetchSelectedGist} from './features/handleactivegist/duck';
import {fetchGists} from './features/listing/fetchgists/duck';


// Haetaan hakuehtoja vastaavat gistit näkymään saavuttaessa.
export function fetchGistsOnEnter(nextState) {
	// Määritetään polkunimen perusteella mitä haetaan.
	let fetchMethod = nextState.location.pathname.match(
			/gists|starred|discover|search/g);
	fetchMethod = fetchMethod == null ? 'gists' : fetchMethod[0];

	if(fetchMethod === 'discover') {
		return store.dispatch(fetchGists('discover', nextState.params.page, null));
	} else if(fetchMethod === 'search') {
		return store.dispatch(fetchGists('search', null, nextState.params.user));
	} else if(fetchMethod === 'starred') {
		return store.dispatch(fetchGists('starred', null, null));
	} else {
		return store.dispatch(fetchGists('gists', null, null));
	}
}

// Haetaan gist näkymään saavuttaessa.
export function fetchSelectedGistOnEnter(nextState) {
	const state = store.getState();
	const activeGistId = state.activeGist.id;
	const requestedGistId = nextState.params.gistId;

	// Haetaan gist, jos tilaan ei ole tallennettu gistiä
	// tai käyttäjän pyytämä gist ei vastaa tilaan tallennettua gist.
	if(activeGistId === null || activeGistId !== requestedGistId) {
		return store.dispatch(fetchSelectedGist(requestedGistId));
	}
}
