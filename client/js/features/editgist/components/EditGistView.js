import {connect} from 'react-redux';
import EditGistLayout from './EditGistLayout';
import {editGist} from '../duck';


function mapStateToProps(state) {
	return {
		gist: state.activeGist,
		isFetching: state.activeGist.isFetching,
		isEditing: state.editGist.isEditing,
		fetchError: state.activeGist.fetchError
	};
}

function mapDispatchToProps(dispatch) {
	return {sendDataToEdit: (id, gistJson) => dispatch(editGist(id, gistJson))};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGistLayout);
