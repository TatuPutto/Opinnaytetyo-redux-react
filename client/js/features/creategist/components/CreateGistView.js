import {connect} from 'react-redux';
import CreateGistLayout from './CreateGistLayout';
import {createGist} from '../duck';

function mapStateToProps(state) {
	return {
		isCreatingSecret: state.createGist.isCreatingSecret,
		isCreatingPublic: state.createGist.isCreatingPublic,
        creationError: state.createGist.creationError
	};
}

function mapDispatchToProps(dispatch) {
	return {create: (gistJson, isPublic) => dispatch(createGist(gistJson, isPublic))};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGistLayout);
