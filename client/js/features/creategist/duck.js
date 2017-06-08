import {create} from '../../utility/fetchmethods';
import {checkStatus, readJson} from '../../utility/handleresponse';
import {receiveSelectedGist} from '../handleactivegist/duck';
import {notify} from '../notification/duck';
import {browserHistory} from 'react-router';


export default function reducer(state = {
	isCreatingSecret: false,
    isCreatingPublic: false,
	creationError: null
}, action) {
	switch(action.type) {
		case 'IS_CREATING_PUBLIC':
			return {
				...state,
				isCreatingPublic: true
			};
			break;
        case 'IS_CREATING_SECRET':
            return {
                ...state,
                isCreatingSecret: true
            };
            break;
        case 'CREATED':
			return {
				...state,
            	isCreatingSecret: false,
			    isCreatingPublic: false,
				creationError: null
			};
			break;
		case 'CREATION_FAILED':
			return {
				...state,
				isCreatingSecret: false,
			    isCreatingPublic: false,
                creationError: action.error
			};
			break;
		default:
			return state;
	}
}

export function createGist(gistJson, isPublic) {
	const url = 'https://api.github.com/gists';
	return (dispatch) => {
		if(isPublic) {
			dispatch(creatingPublicGist());
		}
		else {
			dispatch(creatingSecretGist());
		}

		return create(url, gistJson)
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				dispatch(createdSuccessfully());
				dispatch(receiveSelectedGist(data));
				dispatch(notify('success', 'Gist created successfully.'));
				browserHistory.push('/gist/' + data.id);
			}).catch((error) => {
				dispatch(creationFailed(error));
				dispatch(notify(
                    'failure',
					`Gist creation failed (${error.message}).`
                ));
			});
	};
}

export function creatingPublicGist() {
	return {type: 'IS_CREATING_PUBLIC'};
}

export function creatingSecretGist() {
	return {type: 'IS_CREATING_SECRET'};
}

export function createdSuccessfully() {
    return {type: 'CREATED'};
}

export function creationFailed(error) {
    return {type: 'CREATION_FAILED', error};
}
