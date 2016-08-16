import React from 'react';
import { connect } from 'react-redux';

import CreateGist from '../presentational/create/CreateGist';
import { createGist } from '../../actions/actions';


function mapStateToProps(state) {
	return {};
}



function mapDispatchToProps(dispatch) {
	return {
		create: (gistJson) => {
			dispatch(createGist(gistJson));
		}
	};
}


const CreateGistContainer = connect(
		mapStateToProps,
		mapDispatchToProps
)(CreateGist);


export default CreateGistContainer;