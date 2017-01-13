//Käsittelijä-funktio aktiivisen gistin hallintaan
export function activeGist(state = {
	gist: {},
	gistId: null,
	isStarred: null,
	isFetching: false
}, action) {
	switch(action.type) {
	
		/*//@actions.js
		//Ilmoitetaan aktiivisen gistin mitätöimisestä.
		function invalidateGist() {
			return { type: 'INVALIDATE_GIST' };
		}
		*/
		//@activeGist.js - aktiivisen gistin osalta tilaa hallitseva käsittelijä.
		//Mitätöidään aktiivinen gist.
		case 'INVALIDATE_GIST':
			return {
				...state, 
				gist: {},
				gistId: null,
			}
			break;
			
			
			
		//Aktiivisen gistin hakeminen aloitettiin.
		case 'REQUEST_SELECTED_GIST':
			return {
				...state, 
				gistId: action.gistId,
				isFetching: true
			}
			break;
		//Aktiivisen gistin hakeminen onnistui.
		case 'RECEIVE_SELECTED_GIST':
			return {
				...state, 
				gist: action.activeGist,
				isFetching: false
			}
			break;			
		//Aktiivisen gistin hakeminen onnistui.
		case 'GIST_FETCH_FAILED': 
			return {
				...state, 
				gist: {},
				isFetching: false
			}
			break;	
		case 'STARRED': 
			return {
				...state,
				isStarred: true
			}
			break;
		case 'NOT_STARRED': 
			return {
				...state,
				isStarred: false
			}
			break;
		default:
			return state;
	}
}
