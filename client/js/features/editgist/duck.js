import {patch} from '../../utility/fetchmethods';
import {checkStatus, readJson} from '../../utility/handleresponse';
import {receiveSelectedGist} from '../handleactivegist/duck';
import {notify} from '../notification/duck';
import {browserHistory} from 'react-router';


export default function reducer(state = {
	isEditing: false,
	editingError: null
}, action) {
	switch(action.type) {
		case 'IS_EDITING':
			return {isEditing: true, editingError: null};
			break;
		case 'EDITED':
			return {isEditing: false, editingError: null};
			break;
		case 'EDIT_FAILED':
			return {isEditing: false, editingError: action.error};
			break;
		default:
			return state;
	}
}

export function editGist(id, editJson) {
	const url = `https://api.github.com/gists/${id}`;
	return (dispatch) => {
		dispatch(editingGist());
		return patch(url, editJson)
			.then(checkStatus)
			.then(readJson)
			.then((data) => {
				dispatch(editedSuccessfully());
				dispatch(notify('success', 'Gistin muokkaaminen onnistui.'));
				// Asetetaan muokattu gist aktiiviseksi
				// ja ohjataan käyttäjä muokatun gistin näkymään.
				dispatch(receiveSelectedGist(data));
				browserHistory.push('/gist/' + data.id);
			}).catch((error) => {
				dispatch(editingFailed());
				dispatch(notify('failure',
						`Gistin muokkaaminen ei onnistunut (${error.message}).`));
			});
	};
}

export function editingGist() {
    return {type: 'IS_EDITING'};
}

export function editedSuccessfully() {
    return {type: 'EDTIED'};
}

export function editingFailed(error) {
    return {type: 'CREATION_FAILED', error};
}
