import React from 'react';
import { connect } from 'react-redux';

import EditGist from '../presentational/edit/EditGist';
import { fetchSelectedGist, editGist } from '../../actions/actions';


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		isFetching: state.activeGist.isFetching,
	};
}



function mapDispatchToProps(dispatch) {
	return {
		edit: (gistId, gistJson) => {
			dispatch(editGist(gistId, gistJson));
		}
	};
}


const PassGistToEdit = connect(
	mapStateToProps,
	mapDispatchToProps)
(EditGist);

export default PassGistToEdit;