import {read, update, destroy} from '../../utility/fetchmethods';
import {checkStatus, readJson} from '../../utility/handleresponse';
import {parseSingleGistJson} from '../../utility/parsegists';
import {notify} from '../notification/duck';


export default function activeGist(state = {
	id: null,
	name: null,
	description: null,
	createdAt: null,
	updatedAt: null,
	createdAtUnformatted: null,
	updatedAtUnformatted: null,
	files: [],
	comments: [],
	commentsAmount: null,
	owner: null,
	isPublic: null,
	forkInfo: null,
	isStarred: null,
	isFetching: false,
	isFetchingFiles: false,
	isForking: false,
	fetchError: null,
}, action) {
	switch(action.type) {
		//Mitätöidään aktiivinen gist.
		case 'INVALIDATE_GIST':
			return {
				id: null,
				name: null,
				description: null,
				createdAt: null,
				updatedAt: null,
				createdAtUnformatted: null,
				updatedAtUnformatted: null,
				files: [],
				comments: [],
				owner: null,
				createdAt: null,
				updatedAt: null,
				isPublic: null,
				forkInfo: null,
				isFetching: false,
			};
			break;
		//Aktiivisen gistin hakeminen aloitettiin.
		case 'REQUEST_SELECTED_GIST':
			return {
				...state,
				id: action.id,
				isFetching: true,
				name: null,
				description: null,
				createdAt: null,
				updatedAt: null,
				createdAtUnformatted: null,
				updatedAtUnformatted: null,
				files: [],
				comments: [],
				owner: null,
				createdAt: null,
				updatedAt: null,
				isPublic: null,
				forkInfo: null,
			};
			break;
		//Aktiivisen gistin hakeminen onnistui.
		case 'RECEIVE_SELECTED_GIST':
			return {
				...state,
				name: action.gist.files[0].filename,
				description: action.gist.description,
				files: action.gist.files,
				commentsAmount: action.gist.comments,
				owner: action.gist.owner,
				createdAt: action.gist.createdAt,
				updatedAt: action.gist.updatedAt,
				createdAtUnformatted: action.gist.createdAtUnformatted,
				updatedAtUnformatted: action.gist.updatedAtUnformatted,
				isPublic: action.gist.isPublic,
				forkInfo: action.gist.forkInfo,
				isFetching: false,
				fetchError: null,
			};
			break;
		case 'GIST_FETCH_FAILED':
			return {...state, gist: {}, isFetching: false, fetchError: action.error};
			break;
		case 'STARRED':
			return {
				...state,
				isStarred: true,
			};
			break;
		case 'NOT_STARRED':
			return {
				...state,
				isStarred: false,
			};
			break;
		case 'FORKING':
			return {
				...state,
				isForking: true,
			};
			break;
		case 'FORKED':
			return {
				...state,
				isForking: false,
			};
			break;
		case 'RECEIVE_COMMENTS':
			return {...state, comments: action.comments};
			break;
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


function requestSelectedGist(id) {
	return {type: 'REQUEST_SELECTED_GIST', id};
}

function receiveSelectedGist(gistJson) {
	const parsedGist = parseSingleGistJson(gistJson);

	return {
		type: 'RECEIVE_SELECTED_GIST',
		// activeGist: parseSingleGistJson(gistJson),
	//	fetchError: null,
		gist: parsedGist,
	};
}

function gistFetchFailed(error) {
	return {type: 'GIST_FETCH_FAILED', error};
}

function invalidateGist() {
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


function starring() {
	return {type: 'STARRING'};
}


function starred() {
	return {type: 'STARRED'};
}


function notStarred() {
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
		dispatch({type: 'FORKING'});
		return create(url)
			.then(checkStatus)
			.then(() => {
				dispatch({type: 'FORKED'});
				dispatch(notify('success', 'Kopioitu tilille.'));
			}).catch((error) => dispatch(notify(
				'failure',
				`Kopioiminen epäonnistui (${error.message}).`
			)));
	};
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