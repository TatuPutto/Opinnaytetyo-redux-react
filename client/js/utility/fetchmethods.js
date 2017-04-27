let fetchParams = {
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
};

export function setAuthorizationHeader(accessToken) {
	fetchParams = {
		headers: {
			...fetchParams.headers,
			'Authorization': 'token ' + accessToken
		},
	}
}

export function create(url, content) {
	return fetch(url, {
		...fetchParams,
		method: 'POST',
		body: JSON.stringify(content),
	});
}

export function read(url) {
	return fetch(url, {
		...fetchParams,
		method: 'GET',
	});
}

export function patch(url, content) {
	return fetch(url, {
		...fetchParams,
		method: 'PATCH',
		body: JSON.stringify(content),
	});
}

export function update(url, content) {
	return fetch(url, {
		...fetchParams,
		method: 'PUT',
		body: JSON.stringify(content),
	});
}

export function destroy(url) {
	return fetch(url, {
		...fetchParams,
		method: 'DELETE',
	});
}
