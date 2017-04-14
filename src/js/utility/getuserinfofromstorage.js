export default function getUserInfoFromCookie() {
	const cookies = document.cookie.split(';');
	let userInfo = [];

	for(let i = 0; i < cookies.length; i++) {
		const key = cookies[i].split('=')[0].trim();
		const value = cookies[i].split('=')[1];

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
