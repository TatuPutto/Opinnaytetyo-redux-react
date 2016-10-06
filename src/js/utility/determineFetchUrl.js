export function determineFetchUrl(fetchingMethod) {
	let url;
	
	if(fetchingMethod === 'gists') {
		url = 'https://api.github.com/users/TatuPutto/gists';
	}
	else if(fetchingMethod === 'favorites') {
		url = 'https://api.github.com/gists/starred';
	}
	else if(fetchingMethod === 'discover'){
		url = 'https://api.github.com/gists/public';
	}
	else {
		url = 'https://api.github.com/users/TatuPutto/gists';
	}
	
	return url;
}
