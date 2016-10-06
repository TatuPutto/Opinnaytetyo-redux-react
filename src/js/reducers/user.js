//Reducer-funktio käyttäjätietojen hallintaan
export function user(state = {
	userLogin: 'Anonyymi',
	avatarUrl: 'https://avatars3.githubusercontent.com/u/5699778?v=3&s=40'
}, action) {
	switch(action.type) {
		case 'FETCH_USER_INFO_SUCCESS':
			return {
				...state,
				userLogin: action.userLogin,
				avatarUrl: action.avatarUrl
			}
			break;
		default:
			return state;
	}
}
