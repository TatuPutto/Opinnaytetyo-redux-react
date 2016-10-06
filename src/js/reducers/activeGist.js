//Reducer-funktio aktiivisen gistin hallintaan
export function activeGist(state = {
	gist: {},
	gistId: '',
	isStarred: null,
	isChecking: false,
	isFetching: false
}, action) {
	switch(action.type) {
		case 'INVALIDATE_GIST':
		return {
			...state, 
			gistId: action.activeGistId,
			isFetching: false
		}
			break;
		case 'FETCH_SELECTED_GIST_REQUEST':
			return {
				...state, 
				gistId: action.activeGistId,
				isFetching: true
			}
			break;
		case 'FETCH_SELECTED_GIST_SUCCESS':
			return {
				...state, 
				gist: action.activeGist,
				isFetching: false
			}
			break;
		case 'FETCH__GIST_FAILURE': 
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
