//Käsittelijä-funktio gistien suodattamille.
export function filters(state = { languages: [] }, action) {
	switch(action.type) {
		case 'ADD_FILTER':
			return  {
				...state,
				languages: state.languages.concat(action.language)			
			};
			break;	
			
		//@actions.js
		//Ilmoitetaan mikä suodatin halutaan poistaa.
		function removeFilter(language) {
			return { type: 'REMOVE_FILTER', language };
		}
			
		//@filters.js - suodattimien osalta tilaa hallitseva käsittelijä.
		//Poistetaan suodatin.
		case 'REMOVE_FILTER':
			return {
				...state,
				languages: state.languages.filter(language => language !== action.language)
			};
			break;
			
			
		case 'SORT_OLDEST_TO_NEWEST':
			return {
				...state,
				chronologicalOrder: true
			};
			break;
		case 'SORT_NEWEST_TO_OLDEST':
			return {
				...state,
				chronologicalOrder: false
			};
			break;
		//Palautetaan vakioarvot tai nykyinen tila gistien osalta, 
		//jos action ei vastannut yhtäkään case-tapausta
		default:
			return state;
	}
}
