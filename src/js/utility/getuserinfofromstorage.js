export function doesUserInfoCookieExist() {
	let cookies = document.cookie.split(';');

	for(let i = 0; i < cookies.length; i++) {
		let name = cookies[i].split('=')[0].trim();

		if(name === 'accesstoken') {
			return true;
		}
	}

	return false;
}

export function getUserInfoFromCookie() {
	const cookies = document.cookie.split(';');
	let userInfo = [];

	for(let i = 0; i < cookies.length; i++) {
		let key = cookies[i].split('=')[0].trim();
		let value = cookies[i].split('=')[1];

		switch(key) {
			case 'id':
				userInfo[0] = value;
				break;
			case 'username':
				userInfo[1] = value;
				break;
			case 'avatar_url':
				userInfo[2] = value;
				break;
			case 'access_token':
				userInfo[3] = value;
				break;
		}
	}
	return userInfo;
}

/*
export function storeSearchQuery(searchTerm) {
	if(typeof(Storage) !== 'undefined') {
		let searchHistory = localStorage.getItem('searchHistory');

		if(searchHistory === null) {
			localStorage.setItem('searchHistory', searchTerm);
		} else {
			if(searchHistory.toLowerCase().indexOf(searchTerm.toLowerCase() !== -1)) {
				localStorage.setItem('searchHistory', searchHistory + ';' + searchTerm);
			} else {
					console.log('Olet jo hakenut tällä termillä!');
			}
		}
	} else {
		alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

export function getSearchQueries(value) {
	if(typeof(Storage) !== 'undefined') {
		let suggestions = [];

		console.log(localStorage.getItem('searchHistory'));
		if(value) {
		 	let searchedTerms = localStorage.getItem('searchHistory');
			if(searchedTerms !== null) {
				searchedTerms = searchedTerms.split(';');

				searchedTerms.forEach((term) => {
					let match = term.toLowerCase().indexOf(value.toLowerCase());
					if(match !== -1) {
						suggestions.push(term);
					}
				});

				return sortAlphabetically(suggestions);
			}
		}
		console.log(suggestions);

		return suggestions;
	} else {
		alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

// Järjestetään ehdotukset aakkosjärjestykseen
function sortAlphabetically(suggestions) {
	const sortedSuggestions = suggestions.sort((a, b) => {
		a = a.toLowerCase();
		b = b.toLowerCase();

		if(a < b) return -1;
		if(a > b) return 1;
	});
	return sortedSuggestions;
}*/
