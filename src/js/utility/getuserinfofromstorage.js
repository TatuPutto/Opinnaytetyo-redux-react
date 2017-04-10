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
				userInfo[2] = decodeURIComponent(value);
				break;
			case 'access_token':
				userInfo[3] = value;
				break;
		}
	}
	return userInfo;
}
