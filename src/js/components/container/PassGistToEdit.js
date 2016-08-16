import React from 'react';
import { connect } from 'react-redux';

import EditGist from '../presentational/edit/EditGist';
import { fetchSelectedGist, editGist } from '../../actions/actions';


function mapStateToProps(state) {
	return {
		activeGist: state.default.activeGist,
		isLoading: state.default.isLoadingActive 
	};
}



function mapDispatchToProps(dispatch) {
	return {
		edit: (gistJson) => {
			dispatch(editGist(gistJson));
		}
	};
}


const PassGistToEdit = connect(mapStateToProps, mapDispatchToProps)(EditGist);

export default PassGistToEdit;