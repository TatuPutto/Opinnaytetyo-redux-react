//Tallennetaan käyttäjätiedot local storageen
export function storeUserInfo(userInfo, accessToken) {
	if (typeof(Storage) !== 'undefined') {
		//localStorage.setItem('userLogin', userInfo.user.login);
		//localStorage.setItem('userAvatar', userInfo.user.avatar_url);
		localStorage.setItem('userLogin', 'TatuPutto');
		localStorage.setItem('userAvatar', 'https://avatars.githubusercontent.com/u/408570?v=3');
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
		
		userInfo.user['login'] = localStorage.getItem('userLogin');
		userInfo.user['avatar_url'] = localStorage.getItem('userAvatar');
		//userInfo.user['accessToken'] = localStorage.getItem('accessToken');

		userInfo.user['accessToken'] = '5b0d63952ec6b5737dbe4e5cb9b367471c3b1da1';
		
		console.log(userInfo);
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


export function getUserInfoFromCookie() {
	let cookies = document.cookie.split(';');
	let accessToken;
	
	for(let i = 0; i < cookies.length; i++) {
		let name = cookies[i].split('=')[0].trim();
		
		if(name === 'accesstoken') {
			accessToken = cookies[i].split('=')[1];
		}
	}
	
	let userInfo = {};
	userInfo['user'] = {};
	
	userInfo.user['login'] = localStorage.getItem('userLogin');
	userInfo.user['avatar_url'] = localStorage.getItem('userAvatar');
	//userInfo.user['accessToken'] = localStorage.getItem('accessToken');

	userInfo.user['accessToken'] = accessToken;
	
	if(userInfo !== null) {
		return userInfo;
	}
	else {
		return null;
	}
	
		
	return null;
}

