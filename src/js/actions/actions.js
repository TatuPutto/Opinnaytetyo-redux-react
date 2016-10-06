import * as types from './actionTypes';
import { parseSingleGistJson, parseMultipleGistsJson, 
		parseFiles, parseFilesWithSource } from '../utility/parseGistsJson';
import { storeUserInfo, getUserInfoFromStorage } from '../utility/persistUserInfo';
import { showFetchError } from '../utility/infoWindow';
import { determineFetchUrl } from '../utility/determineFetchUrl';


var userInfo = {};



function sendRequest(url, httpMethod) {
	let fetchInit = {
		method: httpMethod,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'token ' + userInfo.user.accessToken
		}
	};
	
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
		userLogin: userInfoJson.user.login,
		avatarUrl: userInfoJson.user.avatar_url
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
		userInfo = getUserInfoFromStorage();
		
		if(userInfo != null) {
			dispatch(receiveUserInfo(userInfo));
		}
		else {
			console.log('localstorage on tyhjä');
		}
		
	}
	
	
}



export function login() {
	//Yritetään hakea käyttäjätietoja local storagesta
	let userInfo = getUserInfoFromStorage();

	window.location.href = 'https://github.com/login/oauth/authorize?client_id=566fea61a0cebae27268&scope=gist';
}
	




export function logout() {
}








/////////////////////////////////////////////////////////////////////////
//Aktiivisen gistin hakeminen////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function requestSelectedGist(activeGistId) {
	return {
		type: 'FETCH_SELECTED_GIST_REQUEST',
		activeGistId,
		isFetching: true
	};
}

function receiveSelectedGist(json) {
	return {
		type: 'FETCH_SELECTED_GIST_SUCCESS',
		activeGist: parseSingleGistJson(json),
		isFetching: false
	};
}

function gistFetchFailed(error) {
	return {
	    type: 'FETCH_GIST_FAILURE',
	    activeGist: null,
	    isFetching: false
	}
}

function invalidateGist(error) {
	return {
	    type: 'INVALIDATE_GIST',
	    activeGist: {},
	    activeGistId: '',
	    isFetching: false
	}
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
		    		const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
		    	}
		    //Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
		    }).catch(error => {
		    	  dispatch(gistFetchFailed());
		    	  showFetchError(error.message);
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
		    		const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
		    	}
		    //Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
		    }).catch(error => {
		    	showFetchError(error.message);
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
	
	let fetchInit = {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Content-length': 0,
       		'Authorization': 'token ' + userInfo.user.accessToken
		}
	};

	return dispatch => {
		dispatch(starred());
		
	    return fetch('https://api.github.com/gists/' + id + '/star', fetchInit)
    	.then(response => {
    		if(response.ok) {
				console.log('Lisääminen suosikkeihin onnistui');
			}
			else {
				const error = new Error(
						response.status + ' ' + response.statusText);
				throw error;
			}
		}).catch(function(error) {
			console.log('Gistin lisääminen suosikkeihin ei onnistunut: ' + error.message);
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
					console.log('Poistaminen suosikeista onnistui')
				}
				else {
					const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
				}
			}).catch(error => {
				console.log('Gistin poistaminen suosikeista ei onnistunut: ' + error.message);
			});
	}
}


/////////////////////////////////////////////////////////////////////////
//Gistin forkaaminen////////////////////////////////////////////
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
					const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
				}
			}).catch(error => {
				console.log('Forkkaaminen ei onnistunut: ' + error.message);
			});
	}
}

//Tarkistetaan onko gist forkattu
export function checkIfForked(id) {
	console.log('tarkistetaan');
	return dispatch => {
	    //Lähetetetään pyyntö ja jäädään odottamaan vastausta (Promise - pending)
	    return sendRequest('https://api.github.com/gists/' + id + '/forks', 'GET')
		    //Käsitellään promise
		    .then(response => {  	
		    	//(Promise - fulfill) Jos haku onnistui, lähetetään vastaus käsiteltäväksi
		    	if(response.ok) {
		    		console.log('haku onnistui');
		    		response.json().then(json => {
		    			let forked = false;
		    			
		    			json.forEach(fork => {
		    				console.log(fork.owner.login);
		    				if(fork.owner.login === userInfo.user.login) {
		    					alert('Olet jo forkannut tämän gistin.')
		    					forked = true;
		    				}	
		    			});
		    			
		    			if(forked) {
		    				dispatch(forked());
		    			}
		    			else {
		    				dispatch(notForked());
			    			dispatch(forkGist(id));
		    			}
		    		});
		    	}
		    	//Jos joku muu virhekoodi, heitetään error
		    	else {
		    		const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
		    	}
		    //Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
		    }).catch(error => {
		    	showFetchError(error.message);
		    });
	} 
}





/////////////////////////////////////////////////////////////////////////
//Hakuehtoja vastaavien gistien hakeminen////////////////////////////////
/////////////////////////////////////////////////////////////////////////

//Ilmoitetaan gistien haun alkamisesta
function requestGists() {
	return {
		type: 'FETCH_GISTS_REQUEST',
		invalidateCurrentList: true,
		isFetching: true	
	}
}


/**
 * Otetaan löydetyt gistit vastaan
 */
function receiveGists(json) {
	return {
	    type: 'FETCH_GISTS_SUCCESS',
	    gists: parseMultipleGistsJson(json),
	    isFetching: false
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


/*
export function fetchGists() {
	return dispatch => {
		
/*
return fetch('https://api.github.com/users/TatuPutto/gists')
	.then(response => response.json())
		.then(json => dispatch(receiveGists(json)))
		
		
	}
	
	//Kun haku on suoritettu, luetaan vastauksen runko(body)
}
//Haetaan gistit

*/
/**
 * Suoritetaan gistien hakeminen
 */
export function fetchGists(fetchingMethod) {
	console.log('Haetaan gistit')

	//Lähetetään dispatch-funktio paluuarvona
	return dispatch => {
		dispatch(invalidateGist());
		//Lähetetään action, joka ilmoittaa uusien gistien latauksen alkaneen
	    dispatch(requestGists());
	    
	    return sendRequest(determineFetchUrl(fetchingMethod), 'GET')
    		.then(response => {
    			//Jos haku onnistui lähetetään gistien tiedot sisältävä json eteenpäin
	    		if(response.ok) {
					response.json().then(json => {
						dispatch(receiveGists(json));
						//dispatch(fetchSelectedGist(json[0].id));
					})
				}
	    		//Jos haku epäonnistui, heitetään poikkeus
				else {
					const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
				}
			})
			//Ilmoitetaan käyttäjälle miksi haku ei onnistunut
			.catch(error => {
				dispatch(gistsFetchFailed(error.message));
				console.log('Haku ei onnistunut: ' + error.message);
			});
		
	}
}



/////////////////////////////////////////////////////////////////////////
//Näytettävien tulosten suodattaminen////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


export function filterByLanguage(language, gists) {
	let filteredGists = [];
	
	gists.forEach((gist, i) => {
		if(gist.files[0].language.toLowerCase() === language.toLowerCase()) {
			filteredGists.push(gist);
		}
	})
	
	return {
	    type: 'FILTER_BY_LANGUAGE',
	    language,
	    gists: filteredGists,
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
	let fetchInit = {
		method: 'POST',
		body: gistJson,
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token ' + userInfo.user.accessToken
		}
	};

	return dispatch => {
	   // dispatch(requestCreation());//Loaderit päälle
	    
	    return fetch('https://api.github.com/gists', fetchInit)
	    	.then(response => {
	    		if(response.ok) {
					response.json().then(json => {
						//dispatch(created(json));
						window.history.pushState({}, 'gist', '/gist/' + json.id);
						//window.location.href = '/gist/' + json.id;
					})
				}
				else {
					const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
				}
			}).catch(function(error) {
				//dispatch(creationFailed());
				console.log('Gistin luominen ei onnistunut.');
			});
	}
}


/////////////////////////////////////////////////////////////////////////
//Gistin muokkaaminen////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

export function editGist(id, gistJson) {
	console.log('Muokataan gistiä')
	
	return dispatch => {
		return sendRequest('https://api.github.com/gists/' + id, 'PATCH')
	    	.then(response => {
	    		if(response.ok) {
					response.json().then(json => {
						console.log('Gistin muokkaaminen onnistui!');
						//dispatch(receiveCreationResult(json));
						//dispatch(invalidateGist());
					})
				}
				else {
					const error = new Error(
							response.status + ' ' + response.statusText);
					throw error;
				}
			}).catch(function(error) {
				console.log('Gistin lisääminen ei onnistunut: ' + error.message);
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
					response.json().then(json => {
						console.log('Gistin poistaminen onnistui.');
					})
				}
				else {
					const error = new Error(
							response.status + ' ' + response.statusText);
					error.response = response;
					throw error;
				}
			}).catch(function(error) {
				console.log('Gistin poistaminen ei onnistunut, ' + error.message);
			});
	}
}

function removeGistFromList(id) {
	return {
	    type: 'REMOVE_GIST_FROM_LIST',
	    id
	}
}
