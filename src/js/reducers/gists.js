//Reducer-funktio gistien hallintaan
export function gists(state = { 
	fetchMethod: 'gists', 
	isFetching: false,
	items: [],
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
				isFetching: true
			}
			break;
		//Gistien hakeminen onnistui
		case 'FETCH_GISTS_SUCCESS':
			return {
				...state,
				items: action.gists,
				fetchedAt: action.fetchedAt,
				isFetching: false	
			}
			break;
		//Gistien hakeminen epäonnistui
		case 'FETCH_GISTS_FAILURE':
			return {
				...state,
				items: [],
				isFetching: false,
				fetchError: action.error
			}
			break;
		case 'FILTER_BY_LANGUAGE':
			return {
				...state,
				items: action.gists,
			}
			break;
		case 'REMOVE_FILTER':
			return {
				...state,
				items: state.itemsBeforeFiltering
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
		//Palautetaan vakioarvot tai nykyinen tila gistien osalta, 
		//jos action ei vastannut yhtäkään case-tapausta
		default:
			return state;
	}
}
