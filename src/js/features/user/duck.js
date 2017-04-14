import {setAcccessToken} from '../../utility/fetchmethods';

export default function user(state = {
	id: null,
	userLogin: 'Anonyymi',
	avatarUrl: 'https://avatars3.githubusercontent.com/u/5699778?v=3&s=40',
	accessToken: null
}, action) {
	switch(action.type) {
		case 'FETCH_USER_INFO_SUCCESS':
			return {
				id: action.id,
				userLogin: action.userLogin,
				avatarUrl: action.avatarUrl,
				accessToken: action.accessToken
			}
			break;
		default:
			return state;
	}
}

export function receiveUserInfo(userInfo) {
	setAcccessToken(userInfo[3]);
	return {
		type: 'FETCH_USER_INFO_SUCCESS',
		id: userInfo[0],
		userLogin: userInfo[1],
		avatarUrl: userInfo[2],
		accessToken: userInfo[3],
	};
}
