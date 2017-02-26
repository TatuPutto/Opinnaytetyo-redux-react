//Käsittelijä-funktio aktiivisen gistin hallintaan.
export function miscActions(state = {
	isCreatingSecret: false,
    isCreatingPublic: false,
	isEditing: false,
}, action) {
	switch(action.type) {
		case 'IS_CREATING_PUBLIC':
			return {
				...state,
				isCreatingPublic: true,
			};
			break;
        case 'IS_CREATING_SECRET':
            return {
                ...state,
                isCreatingSecret: true,
            };
            break;
        case 'CREATED':
			return {
				...state,
            	isCreatingSecret: false,
			    isCreatingPublic: false,
			};
			break;
        case 'IS_EDITING':
			return {
				...state,
				isEditing: true,
			};
			break;
        case 'EDITED':
			return {
				...state,
				isEditing: false,
			};
			break;
		default:
			return state;
	}
}
