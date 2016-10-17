export function determineEndpoint(fetchingMethod, pageNum) {
	pageNum = (typeof pageNum === 'undefined') ? 1 : pageNum;
	let url;

	if(fetchingMethod === 'gists') {
		url = 'https://api.github.com/gists';
	}
	else if(fetchingMethod === 'starred') {
		url = 'https://api.github.com/gists/starred';
	}
	else if(fetchingMethod === 'discover'){
		url = 'https://api.github.com/gists/public?page=1&per_page=50';
	}
	else {
		url = 'https://api.github.com/gists';
	}
	
	return url;
}
