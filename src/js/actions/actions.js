/* eslint linebreak-style: ["error", "windows"]*/

import {browserHistory} from 'react-router';
import {determineEndpoint} from '../utility/determineFetchUrl';
import {
	parseSingleGistJson,
	parseMultipleGistsJson,
} from '../utility/parseGistsJson';
import {
	sendRequest,
	sendRequestWithContent,
	checkStatus,
	readJson,
	getAccessToken,
} from '../utility/sendRequest';


/*
function fetchResource() {
	return (dispatch) => {
		dispatch(requestResource());
		return sendRequest('https://api.github.com/gists', GET)
			.then(checkStatus)
			.then(readJson)
			//Jos pyyntö onnistui ja vastauksen sisältö luettiin onnistuneesti.
			.then((data) => dispatch(receiveResource(data)))
			//Jos pyyntö epäonnistui tai vastauksen sisältöä ei onnistuttu lukemaan.
			.catch((error) => dispatch(fetchFailed(error)));
	};
}


function fetchResource() {
	//Toiminnon muodostaja palauttaa funktion, toiminnon sijaan.
	return (dispatch) => {
		//Lähetetään haun alkamisesta ilmoittava toiminto.
		dispatch(requestResource());

		//Lähetetään pyyntö.
		return fetch('https://api.github.com/gists')
			//Käsitellään vastaus.
			.then(response => {
				//Jos pyyntö onnistui, luetaan vastausksen sisältö ja lähetetään se eteenpäin.
				if(response.ok) {
					response.json().then(json => dispatch(receiveResource(json)));
				//Jos pyyntö epäonnistui, heitetään poikkeus.
				} else {
					throw new Error(response.status + ' ' + response.statusText);
				}
			}).catch(error => dispatch(fetchFailed(error)));
	};
}

*/

function notify(message) {
	return {type: 'SHOW_NOTIFICATION', message};
}

export function closeNotification() {
	return {type: 'CLOSE_NOTIFICATION'};
}


// ///////////////////////////////////////////////////////////////////////
// Käyttäjätietojen hakeminen/////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
export function requestUserInfo() {
	return {type: 'FETCH_USER_INFO_REQUEST'};
}

export function receiveUserInfo() {
	return {
		/* type: 'FETCH_USER_INFO_SUCCESS',
		id: userInfoJson.user.id,
		userLogin: userInfoJson.user.login,
		avatarUrl: userInfoJson.user.avatar_url,
		accessToken: userInfoJson.user.accessToken*/
		type: 'FETCH_USER_INFO_SUCCESS',
		id: '',
		userLogin: '',
		avatarUrl: 'https://avatars.githubusercontent.com/u/5699778?v=3',
		accessToken: '',
	};
}

export function userInfoFetchFailed() {
	return {type: 'FETCH_USER_INFO_FAILURE'};
}


export function fetchUserInfo() {
	return (dispatch) => {
		dispatch(receiveUserInfo());
		getAccessToken();
		/*
		//Jos eväste löytyy, tarkistetaan onko access token voimassa.
		if(doesUserInfoCookieExist()) {
			dispatch(requestUserInfo);

			fetch('http://localhost:8080/Opinnaytetyo_spring_react/login', {method: 'GET', credentials: 'include', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
			 .then(response => {
		    	//(Promise - fulfill) Jos haku onnistui, lähetetään vastaus käsiteltäväksi
		    	if(response.ok) {

		    		response.json().then(json => {
		    			console.log(json);
		    			dispatch(receiveUserInfo(json))
		    		})
		    	}
		    	//(Promise - reject) Jos haku epäonnistui heitetään error
		    	else {
		    		throw response.status + ' ' + response.statusText;
		    	}
		    //Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
		    }).catch(error => {

		    });
		}
		else {
			return null;
		}

*/

	/* return dispatch => {
		dispatch(requestUserInfo);

		userInfo = getUserInfoFromStorage();


		console.log(userInfo);
		//userInfo = getUserInfoFromCookie();
		//console.log(userInfo);
		if(userInfo != null) {
			dispatch(receiveUserInfo(userInfo));
		}
		else {
			console.log('localstorage on tyhjä');
		}

	}*/
	};
}


// ///////////////////////////////////////////////////////////////////////
// Aktiivisen gistin hakeminen////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

function requestSelectedGist(gistId) {
	return {type: 'REQUEST_SELECTED_GIST', gistId};
}

function receiveSelectedGist(gistJson) {
	return {
		type: 'RECEIVE_SELECTED_GIST',
		activeGist: parseSingleGistJson(gistJson),
	};
}

function gistFetchFailed(error) {
	return {type: 'GIST_FETCH_FAILED'};
}

function invalidateGist() {
	return {type: 'INVALIDATE_GIST'};
}


export function fetchSelectedGist(id) {
	const url = 'https://api.github.com/gists/' + id;

	return (dispatch) => {
		dispatch(requestSelectedGist(id));
		// Tarkistetaan onko gist käyttäjän suosikeissa.
		dispatch(checkIfStarred(id));

		return sendRequest(url, 'GET')
			.then(checkStatus)
			.then(readJson)
			.then((data) => dispatch(receiveSelectedGist(parseSingleGistJson(data))))
			.catch((error) => dispatch(gistFetchFailed(error.message)));
	};
}


export function fetchGists(fetchMethod, pageNumber = 1, user = null) {
	return (dispatch) => {
		// Mitätöidään aktiivinen gist.
		dispatch(invalidateGist());
		// Ilmoitetaan haun alkamisesta.
		dispatch(requestGists(fetchMethod));

		// Lähetetetään pyyntö ja jäädään odottamaan vastausta.
		// Päätepisteenä voi olla: /gists, /gists/starred tai /gists/public.
		return sendRequest(determineEndpoint(fetchMethod, pageNumber, user), 'GET')
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				// Parsitaan vastauksen sisältö ja lähetetään parsittu data varastolle.
				const parsedGists = parseMultipleGistsJson(data);


				dispatch(receiveGists(parsedGists));
				dispatch(fetchSelectedGist(parsedGists[0].id));

				// Päivitetään sivutus, jos hakutyyppinä discover.
				if(fetchMethod === 'discover') {
					dispatch(updatePagination(pageNumber));
				}
			}).catch((error) => dispatch(gistsFetchFailed(error.message)));
		};
}


// ///////////////////////////////////////////////////////////////////////
// Gistin tähdittäminen///////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

// Tarkistetaan onko gist asetettu suosikkeihin


export function checkIfStarred(id) {
	const url = 'https://api.github.com/gists/' + id + '/star';

	return (dispatch) => {
		return sendRequest(url, 'GET')
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
			}).catch((error) => dispatch(notify(error.message)));
	};
}


function requestStarredCheck() {
	return {type: 'CHECK_STARRED_STATUS'};
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
		return sendRequest(url, 'PUT', '')
			.then(checkStatus)
			.then(() => {
				dispatch(starred());
				dispatch(notify('Lisätty suosikkeihin.'));
			}).catch((error) => dispatch(notify(error.message)));
	};
}

// Poistetaan gist suosikeista.
export function unstarGist(id) {
	const url = 'https://api.github.com/gists/' + id + '/star';

	return (dispatch) => {
		dispatch(starring());
		return sendRequest(url, 'DELETE')
			.then(checkStatus)
			.then(() => {
				dispatch(notStarred());
				dispatch(notify('Poistettu suosikeista.'));
			}).catch((error) => dispatch(notify(error.message)));
	};
}

// ///////////////////////////////////////////////////////////////////////
// Gistin forkaaminen/////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////


export function forkGist(id) {
	const url = 'https://api.github.com/gists/' + id + '/forks';

	return (dispatch) => {
		return sendRequest(url, 'POST')
			.then(checkStatus)
			.then(() => dispatch(notify('Gistin kopioiminen onnistui.')))
			.catch((error) => dispatch(notify(error.message)));
	};
}


export function checkIfForked(id) {
	const url = 'https://api.github.com/gists/' + id + '/forks';

	return (dispatch) => {
		return sendRequest(url, 'GET')
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				let isForked = false;
				// Käydään gistin forkkaukset läpi.
				data.forEach((fork) => {
					// Jos kirjautuneen käyttäjän id löytyy forkkauksista, estetään forkkaus.
					if(fork.owner.id === Number(userInfo.user.id)) {
						dispatch(notify('Olet jo forkannut tämän gistin.'));
						isForked = true;
					}
				});

			// Forkataan gist, jos käyttäjä ei ole jo forkannut gistiä.
			if (!isForked) {
				dispatch(forkGist(id));
			}
		}).catch((error) => dispatch(notify(error.message)));
	};
}


export function addFilter(language) {
	return {type: 'ADD_FILTER', language};
}


// Ilmoitetaan gistien haun alkamisesta
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


// Päivitetäänkö lista.
export function shouldFetch(state, fetchMethod) {
	const fetchedAt = state.gists.fetchedAt;
	const previousFetchMethod = state.gists.fetchMethod;

	// Kuinka kauan gistien hakemisesta on kulunut.
	const timeSinceFetch = Date.now() / 1000 - fetchedAt;

	// Mikäli hausta on kulunut vähemmän kuin minuutti, uusia tuloksia ei ladata.
	if(timeSinceFetch < 60 && previousFetchMethod === fetchMethod) {
		return false;
	}

	return true;
}

// Määritetään seuraava ja viimeinen discover-sivu
function updatePagination(current = 1) {
	return {
		type: 'UPDATE_PAGINATION',
		current,
		next: current + 1,
		last: 30,
	};
}

// ///////////////////////////////////////////////////////////////////////
// Näytettävien tulosten suodattaminen////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
export function filterByLanguage(language, gists) {
	let filteredGists = [];

	gists.forEach((gist) => {
		for(let i = 0; i < gist.files.length; i++) {
			if(gist.files[i].language) {
				if(gist.files[i].language.toLowerCase() === language.toLowerCase()) {
					filteredGists.push(gist);
				}
			}
		}
	});

	return {
		type: 'FILTER_BY_LANGUAGE',
		language,
		gists: filteredGists,
	};
}


export function removeFilter(language) {
	return {type: 'REMOVE_FILTER', language};
}


// Järjestetään gistit vanhimmasta uusimpaan
export function sortOldestToNewest(gists) {
	let sorted = gists.sort((a, b) => {
		let dateA = new Date(a.updated_at);
		let dateB = new Date(b.updated_at);

		return dateA - dateB;
	});

	return {
		type: 'SORT_OLDEST_TO_NEWEST',
		chronologicalOrder: true,
		gists: sorted,
	};
}

// Järjestetään gistit uusimmasta vanhimpaan
export function sortNewestToOldest(gists) {
	let sorted = gists.sort((a, b) => {
		let dateA = new Date(a.updated_at);
		let dateB = new Date(b.updated_at);

		return dateB - dateA;
	});

	return {
		type: 'SORT_NEWEST_TO_OLDEST',
		chronologicalOrder: false,
		gists: sorted,
	};
}


// ///////////////////////////////////////////////////////////////////////
// Gistin luominen////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

export function createGist(gistJson) {
	const url = 'https://api.github.com/gists';

	return (dispatch) => {
		return sendRequestWithContent(url, 'POST', gistJson)
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				// Asetetaan muokattu gist aktiiviseksi
				// ja ohjataan käyttäjä luodun gistin näkymään.
				dispatch(receiveSelectedGist(parseSingleGistJson(data)));
				dispatch(notify('Gistin luominen onnistui.'));
				browserHistory.push('/gist/' + data.id);
			}).catch((error) => dispatch(notify(
				'Gistin luominen ei onnistunut. ' + error.message)));
	};
}


// ///////////////////////////////////////////////////////////////////////
// Gistin muokkaaminen////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////


export function editGist(id, editJson) {
	const url = 'https://api.github.com/gists/' + id;

	return (dispatch) => {
		return sendRequestWithContent(url, 'PATCH', editJson)
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				dispatch(notify('Gistin muokkaaminen onnistui.'));
				// Asetetaan muokattu gist aktiiviseksi
				// ja ohjataan käyttäjä muokatun gistin näkymään.
				dispatch(receiveSelectedGist(parseSingleGistJson(data)));
				browserHistory.push('/gist/' + data.id);
			}).catch((error) => dispatch(notify(
				'Gistin muokkaaminen ei onnistunut. ' + error.message)));
	};
}


// ///////////////////////////////////////////////////////////////////////
// Gistin poistaminen////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

export function deleteGist(id) {
	const url = 'https://api.github.com/gists/' + id;

	return (dispatch) => {
		return sendRequest(url, 'DELETE')
			.then(checkStatus)
			.then(() => {
				dispatch(invalidateGist());
				dispatch(removeGistFromList(id));
				dispatch(notify('Gistin poistaminen onnistui.'));

				// Jos poistetaan yksittäisen gistin näkymässä
				// Ohjataan käyttäjä takaisin listausnäkymään
				if(location.pathname === '/gist/' + id) {
					browserHistory.push('/');
				}
			}).catch((error) => dispatch(notify( error.message)));
	};
}


function removeGistFromList(id) {
	return {type: 'REMOVE_GIST_FROM_LIST', id};
}
