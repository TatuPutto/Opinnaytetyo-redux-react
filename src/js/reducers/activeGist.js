//Reducer-funktio aktiivisen gistin hallintaan
export function activeGist(state = {
	gist: {},
	gistId: null,
	isStarred: null,
	isChecking: false,
	isFetching: false
}, action) {
	switch(action.type) {
		case 'INVALIDATE_GIST':
			return {
				...state, 
				gist: {},
				gistId: null,
				isFetching: false
			}
			break;
		case 'REQUEST_SELECTED_GIST':
			return {
				...state, 
				gistId: action.gistId,
				isFetching: true
			}
			break;
		case 'RECEIVE_SELECTED_GIST':
			return {
				...state, 
				gist: action.activeGist,
				isFetching: false
			}
			break;
		case 'GIST_FETCH_FAILED': 
			return {
				...state, 
				gist: action.activeGist,
				isFetching: false
			}
			break;	
		case 'CHECK_STARRED_STATUS': 
			return  {
				...state,
				isChecking: true
			}
			break;
		case 'STARRED': 
			return {
				...state,
				isChecking: false,
				isStarred: true
			}
			break;
		case 'NOT_STARRED': 
			return {
				...state,
				isChecking: false,
				isStarred: false
			}
			break;
		default:
			return state;
	}
}
