import * as types from './actionTypes';
import { parseSingleGistJson, parseMultipleGistsJson, 
		parseFiles, parseFilesWithSource } from '../utility/parseGistsJson';


/////////////////////////////////////////////////////////////////////////
//Käyttäjätietojen hakeminen////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export function requestUserInfo() {
	return {
		type: types.FETCH_USER_INFO_REQUEST
	};
}

export function receivedUserInfo(userInfoJson) {
	console.log(userInfoJson)
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
	//var accessToken = getAccessToken();
	var accessToken = '';
					   
	const url = 'https://api.github.com/applications/566fea61a0cebae27268/tokens/' + 
		'2877a0ee8d6f0ae9225090fc51022a094b4a7700';
				 
	var authString = '566fea61a0cebae27268:87454f258250d9170e31a8f13b51e6a612bd6545';	 
	var encodedAuthString = window.btoa(authString); 
	
	var fetchInit = {
		method: 'get',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'Basic ' + encodedAuthString
		},
	};
	
	return dispatch => {
	    dispatch(requestUserInfo())
	    return fetch(url, fetchInit)
	    .then(response => {														     
	    	if(response.ok) {
	    		response.json().then(json => dispatch(receivedUserInfo(json)))
	    	}
	    	else {
	    	    const error = new Error(
	    	    		response.status + ' ' + response.statusText);
	    	    error.response = response;
	    	    throw error;
	    	}
	    }).catch(error => {
	    	  console.log('Haku ei onnistunut: ' + error.message);
	    });
	};
	/*
	return dispatch => {
	    dispatch(requestUserInfo())
	    return fetch('http://localhost:8080/Opinnaytetyo_spring_react/userinfo', fetchInit)
	    .then(response => {
	    	if(response.ok) {
	    		response.json().then(json => dispatch(receivedUserInfo(json)))
	    	}
	    	else {
	    	    const error = new Error(
	    	    		response.status + ' ' + response.statusText);
	    	    error.response = response;
	    	    throw error;
	    	}
	    }).catch(error => {
	    	  console.log('Haku ei onnistunut: ' + error.message);
	    });
	};*/
}























/////////////////////////////////////////////////////////////////////////
//Aktiivisen gistin hakeminen////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export function requestSelectedGist(activeGistId) {
	return {
		type: types.FETCH_ACTIVE_GIST_REQUEST,
		activeGistId,
		isLoading: true
	};
}

export function receiveSelectedGist(json) {
	
	return {
		type: types.FETCH_ACTIVE_GIST_SUCCESS,
		activeGist: parseSingleGistJson(json),
		isLoading: false
	};
}

export function selectedGistFetchFailed() {
	return {
	    type: types.FETCH_ACTIVE_GIST_FAILURE,
	    isLoading: false
	}
}

/**
 * Haetaan valittu gist
 */
export function fetchSelectedGist(id) {
	const fetchInit = {
		method: 'get',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token 2877a0ee8d6f0ae9225090fc51022a094b4a7700'
		}
	};
	
	return dispatch => {
		console.log('Haetaan gist - ' + id);
	    dispatch(requestSelectedGist(id))
	    return fetch('https://api.github.com/gists/' + id, fetchInit)
	    .then(response => {
	    	if(response.ok) {
	    		response.json().then(json => dispatch(receiveSelectedGist(json)))
	    	}
	    	else {
	    	    const error = new Error(
	    	    		response.status + ' ' + response.statusText);
	    	    error.response = response;
	    	    throw error;
	    	}
	    }).catch(error => {
	    	  console.log('Haku ei onnistunut: ' + error.message);
	    });
	}
}


/////////////////////////////////////////////////////////////////////////
//Hakuehtoja vastaavien gistien hakeminen////////////////////////////////
/////////////////////////////////////////////////////////////////////////


/**
 * Aloitetaan gistien haku
 */
export function requestGists(id) {
	return {
		type: types.FETCH_GISTS_REQUEST,
		invalidateCurrentList: true,
		isLoading: true		
	}
}


/**
 * Otetaan löydetyt gistit vastaan
 */
export function receiveGists(json) {
	return {
	    type: types.FETCH_GISTS_SUCCESS,
	    gists: parseMultipleGistsJson(json),
	    isLoading: false
	}
}


/**
 * Käsitellään epäonnistunut haku
 * 
 */
export function gistsFetchFailed() {
	return {
	    type: types.FETCH_GISTS_FAILURE,
	    isLoading: false
	}
}



/**
 * Suoritetaan gistien hakeminen
 */
export function fetchGists() {
	console.log('Haetaan gistit')
	var fetchInit = {
		method: 'get',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token 2877a0ee8d6f0ae9225090fc51022a094b4a7700'
		}
	};
	
	return dispatch => {
	    dispatch(requestGists());//Loaderit päälle
	    
	    return fetch('https://api.github.com/users/TatuPutto/gists', fetchInit)
    		.then(response => {
	    		if(response.ok) {
					response.json().then(json => {
						dispatch(receiveGists(json));
						dispatch(fetchSelectedGist(json[0].id));
					})
				}
				else {
					const error = new Error(
							response.status + ' ' + response.statusText);
					error.response = response;
					throw error;
				}
			}).catch(error => {
				console.log('Haku ei onnistunut: ' + error.message);
			});
	}
}


//Järjestetään gistit vanhimmasta uusimpaan
export function sortOldestToNewest(gists) {
	var sorted = gists.sort(function(a, b) {
		var dateA = new Date(a.updated_at);
		var dateB = new Date(b.updated_at);
		
		return dateA - dateB;
	});
	
	return {
	    type: types.SORT_OLDEST_TO_NEWEST,
	    chronologicalOrder: true,
	    gists: sorted
	}
}

//Järjestetään gistit uusimmasta vanhimpaan
export function sortNewestToOldest(gists) {
	var sorted = gists.sort(function(a, b) {
		var dateA = new Date(a.updated_at);
		var dateB = new Date(b.updated_at);
		
		return dateB - dateA;
	});
	
	return {
	    type: types.SORT_NEWEST_TO_OLDEST,
	    chronologicalOrder: false,
	    gists: sorted
	}
}

//Uuden gistin luominen
export function requestCreation(gistJson) {
	return {
		type: types.CREATE_GIST,
		creating: true
	};
}

export function receiveCreationResult(json) {
	return {
		type: types.RECEIVE_CREATION_RESULT,
		creating: false,
		
	};
}


export function createGist(gistJson) {
	console.log('Luodaan uusi gist')
	var fetchInit = {
		method: 'post',
		body: gistJson,
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token 2877a0ee8d6f0ae9225090fc51022a094b4a7700'
		}
	};
	
	return dispatch => {
	   // dispatch(requestCreation());//Loaderit päälle
	    
	    return fetch('https://api.github.com/gists', fetchInit)
    	.then(response => {
    		if(response.ok) {
				response.json().then(json => {
					console.log(json);
					//dispatch(receiveCreationResult(json));
				})
			}
			else {
				const error = new Error(
						response.status + ' ' + response.statusText);
				error.response = response;
				throw error;
			}
		}).catch(function(error) {
			console.log('Gistin lisääminen ei onnistunut: ' + error.message);
		});
	}
}


export function editGist(gistId, gistJson) {
	console.log('Muokataan gistiä')
	var fetchInit = {
		method: 'patch',
		body: gistJson,
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token 2877a0ee8d6f0ae9225090fc51022a094b4a7700'
		}
	};
	
	return dispatch => {
	   // dispatch(requestCreation());//Loaderit päälle
	    
	    return fetch('https://api.github.com/gists/' + gistId, fetchInit)
    	.then(response => {
    		if(response.ok) {
				response.json().then(json => {
					console.log('Gistin muokkaaminen onnistui!');
					//dispatch(receiveCreationResult(json));
				})
			}
			else {
				const error = new Error(
						response.status + ' ' + response.statusText);
				error.response = response;
				throw error;
			}
		}).catch(function(error) {
			console.log('Gistin lisääminen ei onnistunut: ' + error.message);
		});
	}
}







