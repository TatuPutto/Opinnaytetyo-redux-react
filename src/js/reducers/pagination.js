//Reducer discover-toiminnallisuuden sivunumerointia varten
export function pagination(state = {
	nextPage: 'https://api.github.com/gists/public?page=2&per_page=50',
	lastPage: null	
}, action) {
	switch(action.type) {
		case 'UPDATE_PAGINATION': 
			return {
				...state,
				nextPage: action.next,
				lastPage: action.last
			}
			break;
		default:
			return state;
	}
	
	
	
}