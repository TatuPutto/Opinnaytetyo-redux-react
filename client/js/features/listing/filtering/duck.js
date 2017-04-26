// Käsittelijä-funktio gistien suodattamille.
export default function reducer(state = {languages: []}, action) {
	switch(action.type) {
		case 'ADD_FILTER':
			return {languages: state.languages.concat(action.language)};
			break;
		case 'REMOVE_FILTER':
			return {
				languages: state.languages.filter((language) =>
						language !== action.language)
			};
			break;
		default:
			return state;
	}
}

export function addFilter(language) {
	return {type: 'ADD_FILTER', language: language.trim()};
}

export function removeFilter(language) {
	return {type: 'REMOVE_FILTER', language: language.trim()};
}
