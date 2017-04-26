import {read} from '../../../utility/fetchmethods';
import {checkStatus, readJson} from '../../../utility/handleresponse';
import determineEndpoint from '../../../utility/getendpoint';
import {parseMultipleGistsJson} from '../../../utility/parsegists';
import {fetchSelectedGist} from '../../handleactivegist/duck';


//Käsittelijä-funktio gistien hallintaan.
export default function reducer(state = {
	fetchMethod: 'gists',
	isFetching: true,
	fetchError: null,
	page: 1,
	items: []
}, action) {
	switch(action.type) {
		case 'REMOVE_GIST_FROM_LIST':
			return  {
				...state,
				items: state.items.filter(item => item.id !== action.id)
			};
		case 'FETCH_GISTS_REQUEST':
			return {...state, fetchMethod: action.fetchMethod, isFetching: true};
		case 'FETCH_GISTS_SUCCESS':
			return {
				...state,
				items: action.gists,
				fetchedAt: action.fetchedAt,
				isFetching: false,
				fetchError: null,
			};
		case 'GISTS_FETCH_FAILURE':
			return {
				...state,
				items: [],
				fetchError: action.error,
				isFetching: false
			};
		case 'UPDATE_PAGINATION':
			return {...state, page: action.page};
		//Palautetaan vakioarvot tai nykyinen tila gistien osalta,
		//jos action ei vastannut yhtäkään case-tapausta
		default:
			return state;
	}
}
/*
const sampledata = require('../../../../static/sampledata');
const samplesingle = require('../../../../static/samplesingle2');

export function fetchGists(fetchMethod, page = 1, user) {
	return (dispatch) => {
		// Ilmoitetaan haun alkamisesta.
		dispatch(requestGists(fetchMethod));

		setTimeout(() => {
			const parsedGists = parseMultipleGistsJson(sampledata);
			dispatch(receiveGists(parsedGists));
			setTimeout(() => {
				dispatch(fetchSelectedGist(parsedGists[0].id));
			}, 10);
		}, 10);
	};
}
*/

export function fetchGists(fetchMethod, page = 1, user) {
	return (dispatch) => {
		// Ilmoitetaan haun alkamisesta.
		dispatch(requestGists(fetchMethod));

		// Lähetetetään pyyntö ja jäädään odottamaan vastausta.
		// Päätepisteenä voi olla: /gists, /gists/starred, /gists/public tai /users/:user/gists.
		return read(determineEndpoint(fetchMethod, page, user))
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				const parsedGists = parseMultipleGistsJson(data);
				dispatch(receiveGists(parsedGists));
				dispatch(fetchSelectedGist(parsedGists[0].id));
				dispatch(updatePagination(Number(page)));
			}).catch((error) => dispatch(gistsFetchFailed(error.message)));
	};
}


export function refresh(fetchMethod, page = 1) {
	return (dispatch) => {
		dispatch(requestGists(fetchMethod));

		return read(
				determineEndpoint(fetchMethod, page) +
				'?cache-bust=' + Date.now())
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				const parsedGists = parseMultipleGistsJson(data);
				dispatch(receiveGists(parsedGists));
				dispatch(fetchSelectedGist(parsedGists[0].id));
				dispatch(updatePagination(page));
			}).catch((error) => dispatch(gistsFetchFailed(error.message)));
	};
}


function requestGists(fetchMethod) {
	return {type: 'FETCH_GISTS_REQUEST', fetchMethod};
}

function receiveGists(gists) {
	return {
		type: 'FETCH_GISTS_SUCCESS',
		gists,
		fetchedAt: new Date().getTime() / 1000,
	};
}

function gistsFetchFailed(error) {
	return {
		type: 'GISTS_FETCH_FAILURE',
		isFetching: false,
		error,
	};
}

function updatePagination(page = 1) {
	return {type: 'UPDATE_PAGINATION', page};
}
