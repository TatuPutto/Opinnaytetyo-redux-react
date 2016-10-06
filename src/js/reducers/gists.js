//Reducer-funktio gistien hallintaan
export function gists(state = {
	//fetchingMethod: 'gists',
	isFetching: false,
	fetchError: null,
	items: [], 
	activeItemId: null,
	itemsBeforeFiltering: [],
	chronologicalOrder: false,
	language: 'Java'
}, action) {
	switch(action.type) {
		case 'REMOVE_GIST_FROM_LIST':
			return  {
				...state,
				items: state.items.slice(state.items.map(item => {
						return item.id;
					}).indexOf(action.id) + 1)
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
				itemsBeforeFiltering: action.gists,
				isFetching: false,	
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