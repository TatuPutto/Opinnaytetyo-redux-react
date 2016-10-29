//Reducer-funktio gistien hallintaan
export function gists(state = { 
	fetchMethod: 'gists', 
	isFetching: true,
	items: [],
	itemsBeforeFiltering: [],
	filter: null
}, action) {
	switch(action.type) {
		case 'REMOVE_GIST_FROM_LIST':
			return  {
				...state,
				items: state.items.filter(item => item.id !== action.id)			
			}
			break;
		//Gistien hakeminen aloitettiin
		case 'FETCH_GISTS_REQUEST':
			return {
				...state,
				fetchMethod: action.fetchMethod,
				isFetching: true
			}
			break;
		//Gistien hakeminen onnistui
		case 'FETCH_GISTS_SUCCESS':
			return {
				...state,
				items: action.gists,
				itemsBeforeFiltering: action.gists,
				fetchedAt: action.fetchedAt,
				isFetching: false	
			}
			break;
		//Gistien hakeminen epäonnistui
		case 'FETCH_GISTS_FAILURE':
			return {
				...state,
				items: [],
				itemsBeforeFiltering: [],
				isFetching: false,
				fetchError: action.error
			}
			break;
		case 'FILTER_BY_LANGUAGE':
			return {
				...state,
				items: action.gists,
				filter: action.language
			}
			break;
		case 'REMOVE_FILTER':
			return {
				...state,
				items: state.itemsBeforeFiltering,
				filter: null
			}
			break;
		case 'SORT_OLDEST_TO_NEWEST':
			return {
				...state,
				items: action.gists,
				chronologicalOrder: action.chronologicalOrder
			}
			break;
		case 'SORT_NEWEST_TO_OLDEST':
			return {
				...state,
				items: action.gists,
				chronologicalOrder: action.chronologicalOrder
			}
			break;
			
		case 'FETCH_MORE_GISTS_SUCCESS':
			return {
				...state,
				//items: state.items.concat(action.gists),
				items: action.gists,
				itemsBeforeFiltering: action.gists,
				fetchMethod: 'discover',
				fetchedAt: action.fetchedAt,
				isFetching: false	
			}
			break;
			
			
		//Palautetaan vakioarvot tai nykyinen tila gistien osalta, 
		//jos action ei vastannut yhtäkään case-tapausta
		default:
			return state;
	}
}
