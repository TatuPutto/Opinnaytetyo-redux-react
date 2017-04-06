export default function notification(state = {
	isOpen: false,
	notificationType: null,
	message: null
}, action) {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			return {
				isOpen: true,
				notificationType: action.notificationType,
				message: action.message,
			};
			break;
	    case 'CLOSE_NOTIFICATION':
	    	return {
                ...state,
				isOpen: false,
				message: null,
			};
			break;
	    default:
	    	return state;
	}
}


export function notify(notificationType = 'success', message) {
	return {type: 'SHOW_NOTIFICATION', notificationType, message};
}

export function closeNotification() {
	return {type: 'CLOSE_NOTIFICATION'};
}
