import {connect} from 'react-redux';
import SingleGistLayout from './SingleGistLayout';


function mapStateToProps(state) {
	return {gist: state.activeGist, userId: state.user.id};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchComments: (id) => dispatch(fetchComments(id)),
		toggleStarredStatus: (isStarred, id) => {
			if(isStarred) {
				dispatch(unstarGist(id));
			}
			else {
				dispatch(starGist(id));
			}
		},
		forkGist: (id) => {
			dispatch(checkIfForked(id));
		},
		deleteGist: (id) => {
			if (confirm('Haluatko varmasti poistaa tämän gistin?')) {
				dispatch(deleteGist(id));
			}
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGistLayout);
