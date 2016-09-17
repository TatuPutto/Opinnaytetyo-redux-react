import * as types from './actionTypes';
import { parseSingleGistJson, parseMultipleGistsJson, 
		parseFiles, parseFilesWithSource } from '../utility/parseGistsJson';
import { storeUserInfo, getUserInfoFromStorage } from '../utility/persistUserInfo';
import { showFetchError } from '../utility/InfoWindow';



var userInfo = {};




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
export function requestSelectedGist(activeGistId) {
	return {
		type: 'FETCH_SELECTED_GIST_REQUEST',
		activeGistId,
		isFetching: true
	};
}

export function receiveSelectedGist(json) {
	return {
		type: 'FETCH_SELECTED_GIST_SUCCESS',
		activeGist: parseSingleGistJson(json),
		isFetching: false
	};
}

export function gistFetchFailed(error) {
	return {
	    type: 'FETCH_GIST_FAILURE',
	    activeGist: null,
	    isFetching: false
	}
}

/**
 * Haetaan valittu gist
 */
export function fetchSelectedGist(id) {
	console.log('Haetaan gist: ' + id)
	
	const fetchInit = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token ' + userInfo.user.accessToken
		}
	};
	
	return dispatch => {
		//Ilmoitetaan haun alkamisesta
	    dispatch(requestSelectedGist(id))
	   
	    //Lähetetetään pyyntö ja jäädään odottamaan vastausta (Promise - pending)
	    return fetch('https://api.github.com/gists/' + id, fetchInit)
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
//Hakuehtoja vastaavien gistien hakeminen////////////////////////////////
/////////////////////////////////////////////////////////////////////////



//Ilmoitetaan gistien haun alkamisesta
export function requestGists() {
	return {
		type: 'FETCH_GISTS_REQUEST',
		invalidateCurrentList: true,
		isFetching: true	
	}
}


/**
 * Otetaan löydetyt gistit vastaan
 */
export function receiveGists(json) {
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
export function gistsFetchFailed() {
	return {
	    type: types.FETCH_GISTS_FAILURE,
	    isFetching: false
	}
}



/**
 * Suoritetaan gistien hakeminen
 */
export function fetchGists(fetchBy = 'usersGists') {
	console.log('Haetaan gistit')
	
	
	let url = '';
	if(fetchBy === 'usersGists') {
		url = 'https://api.github.com/users/TatuPutto/gists';
	}
	else if(fetchBy === 'starred') {
		url = 'https://api.github.com/gists/starred';
	}
	else {
		url = 'https://api.github.com/gists/public';
	}
	
	var fetchInit = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token ' + userInfo.user.accessToken
		}
	};
	
	//Lähetetään dispatch-funktio paluuarvona
	return dispatch => {
		//Lähetetään action, joka ilmoittaa uusien gistien latauksen alkaneen
	    dispatch(requestGists());
	    
	    return fetch(url, fetchInit)
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
					const error = new Error(response.status + ' ' + 
							response.statusText);
					error.response = response;
					throw error;
				}
			})
			//Ilmoitetaan käyttäjälle miksi haku ei onnistunut
			.catch(error => {
				console.log('Haku ei onnistunut: ' + error.message);
			});
	}
}

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

//Uuden gistin luominen
export function requestCreation(gistJson) {
	return {
		type: 'CREATE_GIST',
		creating: true
	};
}

export function receiveCreationResult(json) {
	return {
		type: 'RECEIVE_CREATION_RESULT',
		creating: false,
		
	};
}


export function createGist(gistJson) {
	console.log('Luodaan uusi gist')
	var fetchInit = {
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
		method: 'PATCH',
		body: gistJson,
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token ' + userInfo.user.accessToken
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
