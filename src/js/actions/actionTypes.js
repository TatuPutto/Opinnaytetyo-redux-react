export const SELECT_GIST = 'SELECT_GIST';

/**
 * Action typet
 */

//Käyttäjätietojen hakeminen
export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

//Gistien hakeminen
export const FETCH_GISTS_REQUEST = 'FETCH_GISTS_REQUEST';
export const FETCH_GISTS_SUCCESS = 'FETCH_GISTS_SUCCESS';
export const FETCH_GISTS_FAILURE = 'FETCH_GISTS_FAILURE';

//Aktiivisen gistin asettaminen
export const FETCH_ACTIVE_GIST_REQUEST = 'FETCH_ACTIVE_GIST_REQUEST';
export const FETCH_ACTIVE_GIST_SUCCESS = 'FETCH_ACTIVE_GIST_SUCCESS';
export const FETCH_ACTIVE_GIST_FAILURE = 'FETCH_ACTIVE_GIST_FAILURE';

//Gistien filtteröinti
export const SORT_OLDEST_TO_NEWEST = 'SORT_OLDEST_TO_NEWEST';
export const SORT_NEWEST_TO_OLDEST = 'SORT_NEWEST_TO_OLDEST';

/*
activeGist: {
	gist: {},
	gistId: 'd4eaba93597df82e901175b8c81c0e91',
	isStarred: null,
	isCheckingStarredStatus: false,
	isFetching: true,
}, 
gists: {
	fetchMethod: 'discover', 
	isFetching: false,
	items: [{
		id: '123',
		description: 'Esimerkki gist',
		ispublic: false,
		files: {
			myComp.js: {
	        	filename: 'myComp.js',
	        	language: 'JavaScript'
		    }
		},
		owner: {
			login: 'TatuPutto',
			avatarUrl: 'https://avatars.githubusercontent.com/u/5699778?v=3'
		}
	},{
		//gist nr. 2
	},
	...
	],       
	itemsBeforeFiltering: [{
		//Haun alkuperäiset gistit
	}]
},
pagination: {
	nextPage: 2,
	lastPage: 60
},
user: {
	userLogin: 'TatuPutto',
	avatarUrl: 'https://avatars.githubusercontent.com/u/5699778?v=3',
	accessToken: '06b03de89d26636a1aa1be677863ea702ce2a92d'
}


*/


