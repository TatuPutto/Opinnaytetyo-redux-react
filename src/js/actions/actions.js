import * as types from './actionTypes';
import { parseSingleGistJson, parseMultipleGistsJson, 
		parseFiles, parseFilesWithSource } from '../utility/parseGistsJson';
import { storeUserInfo, getUserInfoFromStorage } from '../utility/persistUserInfo';
import { showFetchError } from '../utility/InfoWindow';

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
		
		const userInfo = getUserInfoFromStorage();
		
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
		isLoading: true
	};
}

export function receiveSelectedGist(json) {
	return {
		type: 'FETCH_SELECTED_GIST_SUCCESS',
		activeGist: parseSingleGistJson(json),
		isLoading: false
	};
}

export function gistFetchFailed(error) {
	return {
	    type: 'FETCH_GIST_FAILURE',
	    activeGist: null,
	    isLoading: false
	}
}

/**
 * Haetaan valittu gist
 */
export function fetchSelectedGist(id) {
	const fetchInit = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token '
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
		isLoading: true	
	}
}


/**
 * Otetaan löydetyt gistit vastaan
 */
export function receiveGists(json) {
	return {
	    type: 'FETCH_GISTS_SUCCESS',
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
		method: 'GET',
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token '
		}
	};
	
	//Lähetetään dispatch-funktio paluuarvona
	return dispatch => {
		//Lähetetään action, joka ilmoittaa uusien gistien latauksen alkaneen
	    dispatch(requestGists());
	    
	    return fetch('https://api.github.com/users/TatuPutto/gists', fetchInit)
    		.then(response => {
    			//Jos haku onnistui lähetetään gistien tiedot sisältävä json eteenpäin
	    		if(response.ok) {
					response.json().then(json => {
						dispatch(receiveGists(json));
						dispatch(fetchSelectedGist(json[0].id));
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
		method: 'POST',
		body: gistJson,
		headers: {
			'Accept': 'application/json',
       		'Content-Type': 'application/json',
       		'Authorization': 'token '
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
       		'Authorization': 'token '
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







