//Tallennetaan käyttäjätiedot local storageen
export function storeUserInfo(userInfo, accessToken) {
	if (typeof(Storage) !== 'undefined') {
		//localStorage.setItem('userLogin', userInfo.user.login);
		//localStorage.setItem('userAvatar', userInfo.user.avatar_url);
		localStorage.setItem('id', '5699778');
		localStorage.setItem('userLogin', 'TatuPutto');
		localStorage.setItem('userAvatar', 'https://avatars3.githubusercontent.com/u/5699778?v=3&s=40');
		localStorage.setItem('accessToken', '');
	} 
	else {
	    alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

//Haetaan käyttäjätiedot local storagesta
export function getUserInfoFromStorage() {
	if (typeof(Storage) !== 'undefined') {
		let userInfo = {};
		userInfo['user'] = {};
		
		userInfo.user['id'] = localStorage.getItem('id');
		userInfo.user['login'] = localStorage.getItem('userLogin');
		userInfo.user['avatar_url'] = localStorage.getItem('userAvatar');
		userInfo.user['accessToken'] = localStorage.getItem('accessToken');
		
		if(userInfo !== null) {
			return userInfo;
		}
		else {
			return null;
		}
	} 
	else {
	    alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

export function removeUserInfoFromStorage() {
	if (typeof(Storage) !== 'undefined') {
		localStorage.removeItem('userLogin');
		localStorage.removeItem('userAvatar');
	} 
	else {
	    alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

	
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
	let cookies = document.cookie.split(';');
	let accessToken;
	
	for(let i = 0; i < cookies.length; i++) {
		let name = cookies[i].split('=')[0].trim();
		
		if(name === 'accesstoken') {
			accessToken = cookies[i].split('=')[1];
		}
	}
	
	return accessToken;
}

