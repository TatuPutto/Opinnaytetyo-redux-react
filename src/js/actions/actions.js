import { browserHistory } from 'react-router'

import * as types from './actionTypes';
import { parseSingleGistJson, parseMultipleGistsJson, 
		parseFiles, parseFilesWithSource } from '../utility/parseGistsJson';
import { storeUserInfo, getUserInfoFromStorage, 
		getUserInfoFromCookie } from '../utility/persistUserInfo';
import { showFetchError, notify } from '../utility/infoWindow';
import { determineEndpoint } from '../utility/determineFetchUrl';


var userInfo = {};

function sendRequest(url, httpMethod, content) {
	content = (typeof content === 'undefined') ? null : content;
	let fetchInit;
	
	
	if(content) {
		fetchInit = {
			method: httpMethod,
			body: content,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-length': content.length,
				'Authorization': 'token ' + userInfo.user.accessToken
			}
		};
	}
	else {
		fetchInit = {
			method: httpMethod,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'token ' + userInfo.user.accessToken
			}
		};
	}
	
		
	return fetch(url, fetchInit);
}




/////////////////////////////////////////////////////////////////////////
//Käyttäjätietojen hakeminen////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export function requestUserInfo() {
	return {
		type: types.FETCH_USER_INFO_REQUEST
	};
}

export function receiveUserInfo(userInfoJson) {
	return {
		type: types.FETCH_USER_INFO_SUCCESS,
		//userLogin: userInfoJson.user.login,
		//avatarUrl: userInfoJson.user.avatar_url
		userLogin: 'TatuPutto',
		avatarUrl: 'https://avatars.githubusercontent.com/u/408570?v=3',
		accessToken: userInfoJson.user.accessToken
	};
}

export function userInfoFetchFailed() {
	return {
	    type: types.FETCH_USER_INFO_FAILURE,
	    
	}
}


export function fetchUserInfo() {	

	return dispatch => {
		dispatch(requestUserInfo);
		
		//const userInfo = getUserInfoFromStorage();
		
		userInfo = getUserInfoFromCookie();
		console.log(userInfo);
		if(userInfo != null) {
			dispatch(receiveUserInfo(userInfo));
		}
		else {
			console.log('localstorage on tyhjä');
		}
		
	}
	
	
}




/////////////////////////////////////////////////////////////////////////
//Aktiivisen gistin hakeminen////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function requestSelectedGist(gistId) {
	return {
		type: 'REQUEST_SELECTED_GIST',
		gistId
	}
}


function receiveSelectedGist(json) {
	return {
		type: 'RECEIVE_SELECTED_GIST',
		activeGist: parseSingleGistJson(json),
	};
}

function gistFetchFailed(error) {
	return { type: 'GIST_FETCH_FAILED' };
}

function invalidateGist() {
	return { type: 'INVALIDATE_GIST' };
}



/**
 * Haetaan valittu gist
 */
export function fetchSelectedGist(id) {
	console.log('Haetaan gist: ' + id)
	
	return dispatch => {
		//Ilmoitetaan haun alkamisesta
	    dispatch(requestSelectedGist(id));
	    //Tarkistetaan onko gist asetettu suosikkeihin
	    dispatch(checkIfStarred(id));
	    //Lähetetetään pyyntö ja jäädään odottamaan vastausta (Promise - pending)
	    return sendRequest('https://api.github.com/gists/' + id, 'GET')
		    //Käsitellään promise
		    .then(response => {
		    	//(Promise - fulfill) Jos haku onnistui, lähetetään vastaus käsiteltäväksi
		    	if(response.ok) {
		    		response.json().then(json => dispatch(receiveSelectedGist(json))) 		
		    	}
		    	//(Promise - reject) Jos haku epäonnistui heitetään error
		    	else {
		    		throw response.status + ' ' + response.statusText;
		    	}
		    //Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
		    }).catch(error => {
		    	  dispatch(gistFetchFailed());
		    	  showFetchError(error);
		    });
	}
}



	

/////////////////////////////////////////////////////////////////////////
//Gistin tähdittäminen///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

//Tarkistetaan onko gist asetettu suosikkeihin
export function checkIfStarred(id) {
	
	return dispatch => {
	    //Lähetetetään pyyntö ja jäädään odottamaan vastausta (Promise - pending)
	    return sendRequest('https://api.github.com/gists/' + id + '/star', 'GET')
		    //Käsitellään promise
		    .then(response => {  	
		    	//(Promise - fulfill) Jos haku onnistui, lähetetään vastaus käsiteltäväksi
		    	if(response.ok) {
		    		dispatch(starred());
		    	}
		    	//Vastaus 404 == gistiä ei ole asetettu suosikiksi
		    	else if(response.status === 404) {
		    		dispatch(notStarred());
		    	}
		    	//Jos joku muu virhekoodi, heitetään error
		    	else {
		    		throw response.status + ' ' + response.statusText;
		    	}
		    //Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
		    }).catch(error => {
		    	showFetchError(error);
		    });
	} 
}


function requestStarredCheck() {
	return {
		type: 'CHECK_STARRED_STATUS',
	}
}

function starred() {
	return {type: 'STARRED'}
}

function notStarred() {
	return {type: 'NOT_STARRED'}
}

//Asetetaan gist suosikiksi
export function starGist(id) {
	console.log('Lisätään gist: ' + id + ' suosikkeihin.');

	return dispatch => {
		dispatch(starred());
		
	    return sendRequest(
	    		'https://api.github.com/gists/' + id + '/star', 'PUT', '')
	    	.then(response => {
	    		if(response.ok) {
					notify('Lisääminen suosikkeihin onnistui');
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				notify('Gistin lisääminen suosikkeihin ei onnistunut: ' + error);
			});
	}
}

//Poistetaan gist suosikeista
export function unstarGist(id) {
	console.log('Poistetaan gist: ' + id + ' suosikeista.');

	return dispatch => {
		dispatch(notStarred());
		
	    return sendRequest('https://api.github.com/gists/' + id + '/star', 'DELETE')
	    	.then(response => {
	    		if(response.ok) {
					notify('Poistaminen suosikeista onnistui')
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				notify('Gistin poistaminen suosikeista ei onnistunut: ' + error);
			});
	}
}


/////////////////////////////////////////////////////////////////////////
//Gistin forkaaminen/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function forked() {
	return {type: 'FORKED'};
}

function notForked() {
	return {type: 'NOT_FORKED'};
}


export function forkGist(id) {
	console.log('Forkataan gist: ' + id);

	return dispatch => {
		dispatch(forked());
		
	    return sendRequest('https://api.github.com/gists/' + id + '/forks', 'POST')
	    	.then(response => {
	    		if(response.ok) {
					console.log('Forkkaaminen onnistui.')
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				console.log('Forkkaaminen ei onnistunut: ' + error);
			});
	}
}

//Tarkistetaan onko gist forkattu
export function checkIfForked(id) {
	return dispatch => {
	    return sendRequest('https://api.github.com/gists/' + id + '/forks', 'GET')
		    .then(response => {  	
		    	if(response.ok) {
		    		response.json().then(json => {
		    			let forked = false;
		    			
		    			json.forEach(fork => {
		    				console.log(fork.owner.login);
		    				if(fork.owner.login === userInfo.user.login) {
		    					notify('Olet jo forkannut tämän gistin.');
		    					forked = true;
		    				}	
		    			});
		    			/*
		    			if(!forked) {
			    			dispatch(forkGist(id));
		    			}*/
		    			 
		    			console.log(json);
		    		
		    		});
		    	}
		    	//Jos joku muu virhekoodi, heitetään error
		    	else {
		    		throw response.status + ' ' + response.statusText;
		    	}
		    //Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
		    }).catch(error => {
		    	notify(error);
		    });
	} 
}





/////////////////////////////////////////////////////////////////////////
//Hakuehtoja vastaavien gistien hakeminen////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function filterByLang(gists, language) {
	if(!language) {
		return gists
	}
			
	let filteredGists = [];
	
	gists.forEach((gist, i) => {
		if(gist.files[0].language) {
			if(gist.files[0].language.toLowerCase() === language.toLowerCase()) {
				filteredGists.push(gist);
			}
		}
	});
	
	return filteredGists;
}

//Ilmoitetaan gistien haun alkamisesta
function requestGists(fetchMethod) {
	return {
		type: 'FETCH_GISTS_REQUEST',
		fetchMethod,
		invalidateCurrentList: true,
		isFetching: true
	}
}

/**
 * Otetaan löydetyt gistit vastaan
 */
function receiveGists(gists) {
	return {
	    type: 'FETCH_GISTS_SUCCESS',
	    gists,
	    filteredGists: filterByLang(gists),
	    fetchedAt: new Date().getTime() / 1000,
	}
}

/**
 * Käsitellään epäonnistunut haku
 * 
 */
function gistsFetchFailed(error) {
	return {
	    type: 'FETCH_GISTS_FAILURE',
	    isFetching: false,
	    error
	}
}


//Määritellään tulisiko nykyinen lista päivittää
export function shouldFetch(state, fetchMethod) {
	const gists = state.gists.items;
	const fetchedAt = state.gists.fetchedAt;
	const previousFetchMethod = state.gists.fetchMethod;
	
	//Tarkistetaan kuinka kauan gistien hakemisesta on kulunut
	const timeSinceFetch = Date.now() / 1000 - fetchedAt;
	
	//Mikäli hausta on kulunut vähemmän kuin minuutti, uusia tuloksia ei ladata
	if(timeSinceFetch < 60 && previousFetchMethod === fetchMethod) {
		console.log(timeSinceFetch);
		return false;
	}
	
	return true;
}




/**
 * Suoritetaan gistien hakeminen
 */
export function fetchGists(fetchMethod) {
	console.log('Haetaan gistit')
	
	//Lähetetään dispatch-funktio paluuarvona
	return dispatch => {
		dispatch(invalidateGist());
		//Lähetetään action, joka ilmoittaa uusien gistien latauksen alkaneen
		dispatch(requestGists(fetchMethod));
	    
	    return sendRequest(determineEndpoint(fetchMethod), 'GET')
    		.then(response => {
    			//Jos haku onnistui lähetetään gistien tiedot sisältävä json eteenpäin
	    		if(response.ok) {
					response.json().then(json => {
						dispatch(receiveGists(parseMultipleGistsJson(json), fetchMethod));
					})
				}
	    		//Jos haku epäonnistui, heitetään poikkeus
				else {
					throw response.status + ' ' + response.statusText;
				}
			})
			//Ilmoitetaan käyttäjälle miksi haku ei onnistunut
			.catch(error => {
				dispatch(gistsFetchFailed(error));
				console.log('Haku ei onnistunut: ' + error);
			});
	}
}


//Määritetään seuraava ja viimeinen discover-sivu
function updatePagination(current, next, last) {
	current = (typeof current === 'undefined') ? 1 : current;
	
	return {
		type: 'UPDATE_PAGINATION',
		current,
		next,
		last	
	};	
}


function receiveMoreGists(json) {
	return {
	    type: 'FETCH_MORE_GISTS_SUCCESS',
	    gists: parseMultipleGistsJson(json),
	    fetchedAt: new Date().getTime() / 1000,
	}
}



export function fetchMoreGists(pageNum) {
	console.log('Haetaan gistejä sivulta: ' + pageNum);
	
	//Lähetetään dispatch-funktio paluuarvona
	return dispatch => {
		dispatch(invalidateGist());
		//Lähetetään action, joka ilmoittaa uusien gistien latauksen alkaneen
	    //dispatch(requestGists(fetchMethod));
		//dispatch(requestMoreGists('discover'));
	    
	    return sendRequest(
	    		'https://api.github.com/gists/public?page=' + pageNum + '&per_page=50', 'GET')
    		.then(response => {
    			//Jos haku onnistui lähetetään gistien tiedot sisältävä json eteenpäin
	    		if(response.ok) {
					response.json().then(json => {
						let headers = response.headers.get('Link');
						
						
						
						
						/*let next = headers.split(',')[0].split(';')[0];
						next = next.substring(1, next.length - 1);
						
						let last = headers.split(',')[1].split(';')[0];
						last = last.substring(2, last.length - 1);
						
			
						dispatch({type: 'NEXT_PAGE', next, last });
						
						*/
						
						
						
						let next = headers.split(',')[0].split(';')[0].split('?')[1].split('&')[0].split('=')[1];
						//next = next.substring(1, next.length - 1);
	
						
					
						let last = headers.split(',')[1].split(';')[0].split('?')[1].split('&')[0].split('=')[1];
						//last = last.substring(1, last.length - 1);
						
		
						
						dispatch(updatePagination(pageNum, next, last));
						
						dispatch(receiveMoreGists(json));
						//dispatch(fetchSelectedGist(json[0].id));
					})
				}
	    		//Jos haku epäonnistui, heitetään poikkeus
				else {
					throw response.status + ' ' + response.statusText;
				}
			})
			//Ilmoitetaan käyttäjälle miksi haku ei onnistunut
			.catch(error => {
				dispatch(gistsFetchFailed(error));
				console.log('Haku ei onnistunut: ' + error);
			});
		
	    /*
		setTimeout(() => {
			dispatch(receiveGists(SAMPLEDATA, 'discover'));
		}, 1000);
	    
	    */
	    
	}
}




/////////////////////////////////////////////////////////////////////////
//Näytettävien tulosten suodattaminen////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


export function filterByLanguage(language, gists) {
	let filteredGists = [];
	
	gists.forEach((gist, i) => {
		if(gist.files[0].language) {
			if(gist.files[0].language.toLowerCase() === language.toLowerCase()) {
				filteredGists.push(gist);
			}
		}
	})
	
	return {
	    type: 'FILTER_BY_LANGUAGE',
	    language,
	    //gists: filteredGists,
	}
}


export function removeFilter() {
	return {
	    type: 'REMOVE_FILTER'
	}
}



//Järjestetään gistit vanhimmasta uusimpaan
export function sortOldestToNewest(gists) {
	var sorted = gists.sort((a, b) => {
		var dateA = new Date(a.updated_at);
		var dateB = new Date(b.updated_at);
		
		return dateA - dateB;
	});
	
	return {
	    type: 'SORT_OLDEST_TO_NEWEST',
	    chronologicalOrder: true,
	    gists: sorted
	}
}

//Järjestetään gistit uusimmasta vanhimpaan
export function sortNewestToOldest(gists) {
	var sorted = gists.sort((a, b) => {
		var dateA = new Date(a.updated_at);
		var dateB = new Date(b.updated_at);
		
		return dateB - dateA;
	});
	
	return {
	    type: 'SORT_NEWEST_TO_OLDEST',
	    chronologicalOrder: false,
	    gists: sorted
	}
}



/////////////////////////////////////////////////////////////////////////
//Gistin luominen////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

//Uuden gistin luominen
function requestCreation(gistJson) {
	return {
		type: 'CREATE_GIST',
		creating: true
	};
}


function receiveCreationResult(json) {
	return {
		type: 'RECEIVE_CREATION_RESULT',
		creating: false,
		
	};
}


export function createGist(gistJson) {
	return dispatch => {
		//Lähetetään luontipyyntö
	    return sendRequest('https://api.github.com/gists', 'POST', gistJson)
	    	.then(response => {
	    		//Ilmoitetaan käyttäjälle gistin luomisen onnistumisesta ja
	    		//ohjataan käyttäjä luodun gistin näkymään
	    		if(response.ok) {
					response.json().then(json => {
						notify('Gistin luominen onnistui.');
						browserHistory.push('/gist/' + json.id);
					});
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
	    	//Ilmoitetaan käyttäjälle, jos lisääminen ei onnistunut
			}).catch(error => {
				notify('Gistin luominen ei onnistunut,' + error);
			});
	}
}


/////////////////////////////////////////////////////////////////////////
//Gistin muokkaaminen////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

export function editGist(id, gistJson) {
	return dispatch => {
		//Lähetetään muokkauspyyntö
		return sendRequest('https://api.github.com/gists/' + id, 'PATCH', gistJson)
	    	.then(response => {
	    		if(response.ok) {
					response.json().then(json => {
						notify('Gistin muokkaaminen onnistui.');
						
						//Asetetaan muokatut tiedot gistin uudeksi arvoksi
						//ja ohjataan käyttäjä muokatun gistin näkymään
						dispatch(receiveSelectedGist(json));
						browserHistory.push('/gist/' + json.id)
					})
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
	    	//Ilmoitetaan käyttäjälle, jos lisääminen ei onnistunut
			}).catch(error => {
				notify('Gistin lisääminen ei onnistunut: ' + error);
			});
	}
}

/////////////////////////////////////////////////////////////////////////
//Gistin poistaminen////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

export function deleteGist(id) {
	return dispatch => {
		//Päivitetään UI-optimistisesti
		dispatch(invalidateGist());
		dispatch(removeGistFromList(id));
		
		return sendRequest('https://api.github.com/gists/' + id, 'DELETE')
	    	.then(response => {
	    		if(response.ok) {
    				notify('Gistin poistaminen onnistui');
    				
    				//Jos poistetaan yksittäisen gistin näkymässä
    				//Ohjataan käyttäjä takaisin listausnäkymään
    				if(location.pathname === '/gist/' + id) {
    					browserHistory.push('/');
    				}
	    		}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				notify('Gistin poistaminen ei onnistunut, ' + error.message);
			});
	}
}

function removeGistFromList(id) {
	return {
	    type: 'REMOVE_GIST_FROM_LIST',
	    id
	}
}
