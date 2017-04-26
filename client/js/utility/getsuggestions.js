const languages = require('../../static/colors.json');

export default function getSuggestions(input, activeFilters) {
	let suggestions = [];

	if(input) {
		for(let language in languages) {
			if(!activeFilters.includes(language)) {
				let match = language.toLowerCase().indexOf(input.toLowerCase());
				if(match !== -1) {
					suggestions.push(language);
				}
			}
		}
		return sortAlphabetically(suggestions);
	}
	return suggestions;
}

function sortAlphabetically(suggestions) {
	const sortedSuggestions = suggestions.sort((a, b) => {
		a = a.toLowerCase();
		b = b.toLowerCase();

		if(a < b) return -1;
		if(a > b) return 1;
	});
	return sortedSuggestions;
}
