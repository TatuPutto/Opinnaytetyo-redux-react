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