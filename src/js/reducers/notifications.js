export function notifications(state = { isOpen: false, message: null }, action) {
	switch (action.type) {
		case 'SHOW_NOTIFICATION': 
			return {
				...state,
				isOpen: true,
				message: action.message
			}
			break;
	    case 'CLOSE_NOTIFICATION': 
	    	return {
				...state,
				isOpen: false,
				message: null
		}
			break;
	    default:
	    	return state;
	}
}