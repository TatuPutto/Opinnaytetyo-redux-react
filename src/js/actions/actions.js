import { browserHistory } from 'react-router'

import { store } from '../createStore';

import { parseSingleGistJson, parseMultipleGistsJson, 
		parseFiles, parseFilesWithSource } from '../utility/parseGistsJson';
		
import { storeUserInfo, getUserInfoFromStorage, 
		getUserInfoFromCookie } from '../utility/persistUserInfo';

import { determineEndpoint } from '../utility/determineFetchUrl';




let userInfo = {};


//Tarkistetaan onnistuiko pyyntö.
function checkStatus(response) {  
	if(response.ok) {  
		return Promise.resolve(response);
	} 
	else {  
		throw response.status + ' ' + response.statusText;
	}  
}

//Luetaan vastauksen sisältö.
function readJson(response) {
	return response.json();
}

//Muodostetaan pyynnöön otsikot sekä sisältö ja lähetetään pyyntö.
function sendRequest(url, httpMethod, content) {
	content = (typeof content === 'undefined') ? null : content;
	let fetchInit;
	
const currentState = store.getState();
	//Määritellään pyynnön otsikot ja sisältö (POST, PATCH, PUT).
	if(content) {
		fetchInit = {
			method: httpMethod,
			body: content,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-length': content.length,
				'Authorization': 'token ' + currentState.user.accessToken
			}
		};
	}

	//Määritellään pyynnön otsikot, kun pyynnöllä ei ole sisältöä (GET, DELETE).
	else {
		fetchInit = {
			method: httpMethod,
			headers: {
				'Accept': 'application/json',
				'Authorization': 'token ' + currentState.user.accessToken
			}
		};
	}
	
	//Lähetetään pyyntö.
	return fetch(url, fetchInit);
}


function fetchResource() {
	return dispatch => {
		 dispatch(requestResource());
		
		return sendRequest('https://api.github.com/gists', GET)
			.then(checkStatus)
			.then(readJson)
			.then(data => {
				console.log('Pyyntö onnistui: ' + data);
				dispatch(receiveResource(data));
			}).catch(error => {
				console.log('Pyyntö epäonnistui: ' + error);
				dispatch(fetchFailed(error))
			});
	}
}





function notify(message) {
	return { type: 'SHOW_NOTIFICATION', message };
}

export function closeNotification() {
	return { type: 'CLOSE_NOTIFICATION' };
}




/////////////////////////////////////////////////////////////////////////
//Käyttäjätietojen hakeminen////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export function requestUserInfo() {
	return {
		type: 'FETCH_USER_INFO_REQUEST'
	};
}

export function receiveUserInfo() {
	return {
		/*type: 'FETCH_USER_INFO_SUCCESS',
		id: userInfoJson.user.id,
		userLogin: userInfoJson.user.login,
		avatarUrl: userInfoJson.user.avatar_url,
		accessToken: userInfoJson.user.accessToken*/
		type: 'FETCH_USER_INFO_SUCCESS',
		id: "5699778",
		userLogin: "TatuPutto",
		avatarUrl: "https://avatars.githubusercontent.com/u/5699778?v=3",
		accessToken: "ee751aec5b64861477e0fa0922fc2e868392dd1a"
		
	};
}

export function userInfoFetchFailed() {
	return {
	    type: 'FETCH_USER_INFO_FAILURE'
	    
	}
}


export function fetchUserInfo() {	
	return dispatch => {
		dispatch(receiveUserInfo());
		
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
	
	/*return dispatch => {
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
/*
//Tarkistetaan onnistuiko pyyntö.
function checkStatus(response) {  
	if(response.ok) {  
		return Promise.resolve(response);
	} 
	else {  
		throw response.status + ' ' + response.statusText;
	}  
}

//Luetaan vastauksen sisältö.
function readJson(response) {
	return response.json();
}
*/






export function fetchSelectedGist(id) {
	return dispatch => {
	    dispatch(requestSelectedGist(id));
	    //Tarkistetaan onko gist käyttäjän suosikeissa.
	    dispatch(checkIfStarred(id));
	
	    return sendRequest('https://api.github.com/gists/' + id, 'GET')
		    .then(checkStatus)  
		    
		    //Luetaan vastaus.
		    .then(readJson)
		    
		    //Jos pyyntö on onnistunut ja vastauksen sisältö on luettu onnistuneesti.
		    .then(data => {
		    	dispatch(receiveSelectedGist(parseSingleGistJson(data)))
		    })

		    //Käsitellään virhetilanne.
		    .catch(error => {
		    	dispatch(gistsFetchFailed(error))
		    });
	}
}
  


  

/*.then(response => {
    	if(response.ok) {
    		response.json().then(json => dispatch(receiveSelectedGist(json)));	
    	}
    	else {
    		throw response.status + ' ' + response.statusText;
    	}
    }).catch(error => {
    	dispatch(gistFetchFailed(error));
    	dispatch(notify('Gistin hakeminen ei onnistunut.' + error));
    });*/





export function fetchGists(fetchMethod, pageNumber, user) {
	pageNumber = (typeof pageNumber === 'undefined') ? 1 : pageNumber;
	user = (typeof user === 'undefined') ? 1 : user;
	
	return dispatch => {
		//Mitätöidään aktiivinen gist.
		dispatch(invalidateGist());
		//Ilmoitetaan haun alkamisesta.
		dispatch(requestGists(fetchMethod));
		
		//Lähetetetään pyyntö ja jäädään odottamaan vastausta.
		//Päätepisteenä voi olla: /gists, /gists/starred tai /gists/public.
	    return sendRequest(determineEndpoint(fetchMethod, pageNumber, user), 'GET')
		    .then(checkStatus)  
		    .then(readJson)
		    .then(data => {  
		    	//Parsitaan vastauksen sisältö ja lähetetään parsittu data varastolle.
		    	let parsedGists = parseMultipleGistsJson(data);
		    	dispatch(receiveGists(parsedGists));

				dispatch(fetchSelectedGist(parsedGists[0].id));
		    	
		    	
		    	//Päivitetään sivutus, jos hakutyyppinä discover.
		    	if(fetchMethod === 'discover') {
	    			dispatch(updatePagination(pageNumber));
		    	}
		  	}).catch(error => dispatch(gistsFetchFailed(error)));
  	}  
}

	    




	

/////////////////////////////////////////////////////////////////////////
//Gistin tähdittäminen///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

//Tarkistetaan onko gist asetettu suosikkeihin


export function checkIfStarred(id) {
	return dispatch => {
	    return sendRequest('https://api.github.com/gists/' + id + '/star', 'GET')
		    .then(response => {  
		    	if(response.ok) {
		    		dispatch(starred());
		    	}
		    	//Jos status-koodi on 404, gistiä ei ole asetettu suosikiksi.
		    	else if(response.status === 404) {
		    		dispatch(notStarred());
		    	}
		    	//Jos joku muu virhekoodi, heitetään virhe.
		    	else {
		    		throw response.status + ' ' + response.statusText;
		    	}
		    }).catch(error => dispatch(notify(error)));
	}
}


function requestStarredCheck() {
	return {
		type: 'CHECK_STARRED_STATUS',
	};
}

function starred() {
	return { type: 'STARRED' };
}

function notStarred() {
	return { type: 'NOT_STARRED' };
}






	    
	    
	    
	    /*.then(response => {
	    		if(response.ok) {
	    			
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				dispatch(notify('Gistin lisääminen suosikkeihin ei onnistunut. ' + error));
			});*/
	

//Lisätään gist suosikkeihin.
export function starGist(id) {
	return dispatch => {
	    return sendRequest('https://api.github.com/gists/' + id + '/star', 'PUT', '')
	    	.then(checkStatus)  
		    .then(() => {
		    	dispatch(starred());
		    	dispatch(notify('Lisätty suosikkeihin.'));
		    }).catch(error => dispatch(notify('Gistiä ei onnistuttu lisäämään suosikkeihin. ' +  error))); 
	}
}

//Poistetaan gist suosikeista
export function unstarGist(id) {
	return dispatch => {
	    return sendRequest('https://api.github.com/gists/' + id + '/star', 'DELETE')
	    	.then(checkStatus)  
		    .then(() => {
		    	dispatch(notStarred());
		    	dispatch(notify('Poistettu suosikeista.'));
		    }).catch(error => dispatch(notify('Gistiä ei onnistuttu poistamaan suosikeista. ' +  error))); 
	}
} 
	    
	    /*
	     * 
	    	.then(response => {
	    		if(response.ok) {
	    			dispatch(notify('Poistettu suosikeista.'));
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				dispatch(notify('Gistin poistaminen suosikeista ei onnistunut: ' + error));
			});

	     */


/////////////////////////////////////////////////////////////////////////
//Gistin forkaaminen/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

//Forkataan gist.


export function forkGist(id) {
	return dispatch => {
	    return sendRequest('https://api.github.com/gists/' + id + '/forks', 'POST')
		    .then(checkStatus)  
		    .then(() => dispatch(notify('Gistin kopioiminen onnistui.')))
		    .catch(error => dispatch(notify('Gistin kopioiminen ei onnistunut. ' +  error))); 
	}
}  
	    
	    
	    /*.then(response => {
	    		if(response.ok) {
	    			dispatch(notify('Forkkaaminen onnistui.'));
				}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				dispatch(notify('Forkkaaminen ei onnistunut: ' + error));
			});*/


/* .then(response => {  	
if(response.ok) {
	response.json().then(json => {
		let isForked = false;
		
		//Käydään gistin forkkaukset läpi.
		json.forEach(fork => {
			//Jos kirjautuneen käyttäjän id löytyy forkkauksista, estetään forkkaus.
			if(fork.owner.id === userInfo.user.id) {
				dispatch(notify('Olet jo forkannut tämän gistin.'));
				isForked = true;
			}	
		});
		
		//Forkataan gist, jos käyttäjä ei ole jo forkannut gistiä.
		if(!isForked) {
			dispatch(forkGist(id));
		}		
	});
}

//Jos joku muu virhekoodi, heitetään error
else {
	throw response.status + ' ' + response.statusText;
}
//Otetaan heitetty error kiinni ja ilmoitetaan haun epäonnistumisesta
}).catch(error => {
dispatch(notify(error));
});*/




export function checkIfForked(id) {
	return dispatch => {
	    return sendRequest('https://api.github.com/gists/' + id + '/forks', 'GET')
		    .then(checkStatus)  
		    .then(readJson)
		    .then(data => {
		    	let isForked = false;
			
				//Käydään gistin forkkaukset läpi.
				data.forEach(fork => {
					//Jos kirjautuneen käyttäjän id löytyy forkkauksista, estetään forkkaus.
					if(fork.owner.id === Number(userInfo.user.id)) {
						dispatch(notify('Olet jo forkannut tämän gistin.'));
						isForked = true;
					}	
				});
				
				//Forkataan gist, jos käyttäjä ei ole jo forkannut gistiä.
				if(!isForked) {
	    			dispatch(forkGist(id));
				}		
		  	}).catch(error => dispatch(notify(error))); 
	} 
}





/////////////////////////////////////////////////////////////////////////
//Hakuehtoja vastaavien gistien hakeminen////////////////////////////////
/////////////////////////////////////////////////////////////////////////



export function addFilter(language) {
	return { type: 'ADD_FILTER', language };
}


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
	return { type: 'FETCH_GISTS_REQUEST', fetchMethod }
}



/**

 * Otetaan löydetyt gistit vastaan
 */
function receiveGists(gists) {
	return {
	    type: 'FETCH_GISTS_SUCCESS',
	    gists,
	    fetchedAt: new Date().getTime() / 1000,
	}
}

/**
 * Käsitellään epäonnistunut haku
 * 
 */
function gistsFetchFailed(error) {
	return {
	    type: 'GISTS_FETCH_FAILURE',
	    isFetching: false,
	    error
	}
}




//Päivitetäänkö lista.

export function shouldFetch(state, fetchMethod) {
	const gists = state.gists.items;
	const fetchedAt = state.gists.fetchedAt;
	const previousFetchMethod = state.gists.fetchMethod;
	
	//Kuinka kauan gistien hakemisesta on kulunut.
	const timeSinceFetch = Date.now() / 1000 - fetchedAt;
	
	//Mikäli hausta on kulunut vähemmän kuin minuutti, uusia tuloksia ei ladata.
	if(timeSinceFetch < 60 && previousFetchMethod === fetchMethod) {
		return false;
	}
	
	return true;
}




/**
 * Suoritetaan gistien hakeminen
 */







//Määritetään seuraava ja viimeinen discover-sivu
function updatePagination(current) {
	current = (typeof current === 'undefined') ? 1 : current;
	
	return {
		type: 'UPDATE_PAGINATION',
		current,
		next: current + 1,
		last: 30	
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
	//Lähetetään dispatch-funktio paluuarvona
	return dispatch => {
		dispatch(requestGists('discover'));
		dispatch(invalidateGist());
	    
	    return sendRequest('https://api.github.com/gists/public?page=' + pageNum + '&per_page=100', 'GET')
    		.then(response => {
    			//Jos haku onnistui lähetetään gistien tiedot sisältävä json eteenpäin
	    		if(response.ok) {
					response.json().then(json => {
						dispatch(updatePagination(pageNum));
						dispatch(receiveGists(parseMultipleGistsJson(json)));			
					});
				}
	    		//Jos haku epäonnistui, heitetään poikkeus
				else {
					throw response.status + ' ' + response.statusText;
				}
			})
			//Ilmoitetaan käyttäjälle miksi haku ei onnistunut
			.catch(error => {
				dispatch(notify('Haku ei onnistunut: ' + error));
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
	
	gists.forEach(gist => {
		for(let i = 0; i < gist.files.length; i++) {
			if(gist.files[i].language) {
				if(gist.files[i].language.toLowerCase() === language.toLowerCase()) {
					filteredGists.push(gist);
				}
			}
		}	
	})
	
	return {
	    type: 'FILTER_BY_LANGUAGE',
	    language,
	    gists: filteredGists,
	}
}


export function removeFilter(language) {
	return { type: 'REMOVE_FILTER', language };
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

export function createGist(gistJson) {
	return dispatch => {
	    return sendRequest('https://api.github.com/gists', 'POST', gistJson)
	    	.then(checkStatus)
	    	.then(readJson)
	    	.then(data => {
	    		dispatch(notify('Gistin luominen onnistui.'));
	    		//Asetetaan muokattu gist aktiiviseksi 
				//ja ohjataan käyttäjä luodun gistin näkymään.
				dispatch(receiveSelectedGist(parseSingleGistJson(data)));
				browserHistory.push('/gist/' + data.id);
	    	}).catch(error => dispatch(notify('Gistin luominen ei onnistunut. ' + error)));
	}
}


/////////////////////////////////////////////////////////////////////////
//Gistin muokkaaminen////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



export function editGist(id, editJson) {
	return dispatch => {
		return sendRequest('https://api.github.com/gists/' + id, 'PATCH', editJson)
			.then(checkStatus)
	    	.then(readJson)
	    	.then(data => {
	    		dispatch(notify('Gistin muokkaaminen onnistui.'));
				//Asetetaan muokattu gist aktiiviseksi 
				//ja ohjataan käyttäjä muokatun gistin näkymään.
				dispatch(receiveSelectedGist(parseSingleGistJson(data)));
				browserHistory.push('/gist/' + data.id);
	    	}).catch(error => dispatch(notify('Gistin muokkaaminen ei onnistunut. ' + error)));
	}
}



/*.then(response => {
if(response.ok) {
	response.json().then(json => {
		dispatch(notify('Gistin muokkaaminen onnistui.'));
		//Asetetaan muokattu gist aktiiviseksi 
		//ja ohjataan käyttäjä muokatun gistin näkymään.
		dispatch(receiveSelectedGist(json));
		browserHistory.push('/gist/' + json.id);
	});
}
else {
	throw response.status + ' ' + response.statusText;
}
//Ilmoitetaan käyttäjälle, jos lisääminen ei onnistunut
}).catch(error => {
dispatch(notify('Gistin lisääminen ei onnistunut: ' + error));
});*/


/////////////////////////////////////////////////////////////////////////
//Gistin poistaminen////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

export function deleteGist(id) {
	return dispatch => {
		return sendRequest('https://api.github.com/gists/' + id, 'DELETE')
	    	.then(checkStatus)
	    	.then(() => {
	    		dispatch(invalidateGist());
	    		dispatch(removeGistFromList(id));
	    		dispatch(notify('Gistin poistaminen onnistui'));
				
				//Jos poistetaan yksittäisen gistin näkymässä
				//Ohjataan käyttäjä takaisin listausnäkymään
				if(location.pathname === '/gist/' + id) {
					browserHistory.push('/');
				}
	    	}).catch(error => dispatch(notify('Gistin poistaminen ei onnistunut, ' + error)));
	}
}
	

		
	/*})
		dispatch(notify('Gistin poistaminen ei onnistunut, ' + error));
	});*
	    	
		/*
		.then(response => {
	    		if(response.ok) {
	    			
	    		}
				else {
					throw response.status + ' ' + response.statusText;
				}
			}).catch(error => {
				dispatch(notify('Gistin poistaminen ei onnistunut, ' + error));
			});*/




function removeGistFromList(id) {
	return {
	    type: 'REMOVE_GIST_FROM_LIST',
	    id
	}
}
