import {read, update, destroy} from '../../utility/fetchmethods';
import {checkStatus, readJson} from '../../utility/handleresponse';
import {parseSingleGistJson} from '../../utility/parsegists';
import {notify} from '../notification/duck';


export default function reducer(state = {
	id: null,
	item: {},
	isStarred: null,
	isFetching: false,
	isForking: false,
	fetchError: null,
}, action) {
	switch(action.type) {
		//Mitätöidään aktiivinen gist.
		case 'INVALIDATE_GIST':
			return {
				...state,
				id: null,
				activeGist: null,
				isFetching: false
			};
		//Aktiivisen gistin hakeminen aloitettiin.
		case 'REQUEST_SELECTED_GIST':
			return {
				...state,
				id: action.id,
				isFetching: true
			};
		//Aktiivisen gistin hakeminen onnistui.
		case 'RECEIVE_SELECTED_GIST':
			return {
				...state,
				item: action.gist,
				isFetching: false,
				fetchError: null,
			};
		case 'GIST_FETCH_FAILED':
			return {
				...state,
				item: {},
				isFetching: false,
				fetchError: action.error
			};
		case 'STARRED':
			return {
				...state,
				isStarred: true,
			};
		case 'NOT_STARRED':
			return {
				...state,
				isStarred: false,
			};
		case 'FORKING':
			return {
				...state,
				isForking: true,
			};
		case 'FORKED':
			return {
				...state,
				isForking: false,
			};
		default:
			return state;
	}
}

export function fetchSelectedGist(id) {
	const url = 'https://api.github.com/gists/' + id;

	return (dispatch) => {
		dispatch(requestSelectedGist(id));
		// Tarkistetaan onko gist käyttäjän suosikeissa.
		dispatch(checkIfStarred(id));

		return read(url)
			.then(checkStatus)
			.then(readJson)
			.then((data) => dispatch(receiveSelectedGist(data)))
			.catch((error) => dispatch(gistFetchFailed(error.message)));
	};
}

export function requestSelectedGist(id) {
	return {type: 'REQUEST_SELECTED_GIST', id};
}

export function receiveSelectedGist(gistJson) {
	const parsedGist = parseSingleGistJson(gistJson);
	return {type: 'RECEIVE_SELECTED_GIST', gist: parsedGist};
}

export function gistFetchFailed(error) {
	return {type: 'GIST_FETCH_FAILED', error};
}

export function invalidateGist() {
	return {type: 'INVALIDATE_GIST'};
}

export function checkIfStarred(id) {
	const url = 'https://api.github.com/gists/' + id + '/star';

	return (dispatch) => {
		return read(url)
			.then((response) => {
				if(response.ok) {
					dispatch(starred());
				// Jos status-koodi on 404, gistiä ei ole asetettu suosikiksi.
				} else if(response.status === 404) {
					dispatch(notStarred());
				// Jos joku muu virhekoodi, heitetään virhe.
				} else {
					throw new Error(response.status + ' ' + response.statusText);
				}
			}).catch((error) => dispatch(notify('failure', error.message)));
	};
}

export function starred() {
	return {type: 'STARRED'};
}

export function notStarred() {
	return {type: 'NOT_STARRED'};
}


// Lisätään gist suosikkeihin.
export function starGist(id) {
	const url = 'https://api.github.com/gists/' + id + '/star';

	return (dispatch) => {
		dispatch(starring());
		return update(url, '')
			.then(checkStatus)
			.then(() => {
				dispatch(starred());
				dispatch(notify('success', 'Lisätty suosikkeihin.'));
			}).catch((error) => dispatch(notify(
				'failure',
				`Suosikkeihin lisääminen epäonnistui (${error.message}).`
			)));
	};
}

export function starring() {
	return {type: 'STARRING'};
}

// Poistetaan gist suosikeista.
export function unstarGist(id) {
	const url = 'https://api.github.com/gists/' + id + '/star';

	return (dispatch) => {
		dispatch(starring());
		return destroy(url, 'DELETE')
			.then(checkStatus)
			.then(() => {
				dispatch(notStarred());
				dispatch(notify('success', 'Poistettu suosikeista.'));
			}).catch((error) => dispatch(notify(
				'failure',
				`Suosikeista poistaminen epäonnistui (${error.message}).`
			)));
	};
}

// ///////////////////////////////////////////////////////////////////////
// Gistin forkaaminen/////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////


export function forkGist(id) {
	const url = 'https://api.github.com/gists/' + id + '/forks';

	return (dispatch) => {
		dispatch(forking());
		return create(url)
			.then(checkStatus)
			.then(() => {
				dispatch(forked());
				dispatch(notify('success', 'Kopioitu tilille.'));
			}).catch((error) => dispatch(notify(
				'failure',
				`Kopioiminen epäonnistui (${error.message}).`
			)));
	};
}

export function forking() {
	return {type: 'FORKING'};
}

export function forked() {
	return {type: 'FORKING'};
}

export function checkIfForked(id) {
	const url = 'https://api.github.com/gists/' + id + '/forks';

	return (dispatch) => {
		return read(url)
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				let isForked = false;

				// Käydään gistin forkkaukset läpi.
				data.forEach((fork) => {
					// Jos kirjautuneen käyttäjän id löytyy forkkauksista, estetään forkkaus.
					if(fork.owner.id === Number(userInfo.user.id)) {
						dispatch(notify('failure', 'Olet jo forkannut tämän gistin.'));
						isForked = true;
					}
				});

			// Forkataan gist jos käyttäjä ei ole jo forkannut gistiä.
			if (!isForked) {
				dispatch(forkGist(id));
			}
		}).catch((error) => dispatch(notify('failure', error.message)));
	};
}


function removeGistFromList(id) {
	return {type: 'REMOVE_GIST_FROM_LIST', id};
}


export function deleteGist(id) {
	const url = 'https://api.github.com/gists/' + id;

	return (dispatch) => {
		return destroy(url)
			.then(checkStatus)
			.then(() => {
				// Jos poistetaan yksittäisen gistin näkymässä,
				// ohjataan käyttäjä takaisin listausnäkymään.
				if(location.pathname === '/gist/' + id) {
					browserHistory.push('/');
				}

				dispatch(invalidateGist());
				dispatch(removeGistFromList(id));
			}).catch((error) => dispatch(notify(
				'failure',
				`Poistaminen epäonnistui (${error.message}).`
			)));
	};
}
