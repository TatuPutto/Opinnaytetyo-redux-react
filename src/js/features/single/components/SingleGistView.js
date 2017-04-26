import {connect} from 'react-redux';
import SingleGistLayout from './SingleGistLayout';
import {
	starGist,
	unstarGist,
	checkIfForked,
	deleteGist,
} from '../../fetchsinglegist/duck';


function mapStateToProps(state) {
	return {gist: state.activeGist, userId: Number(state.user.id)};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			forkGist: (id) => dispatch(checkIfForked(id)),
			toggleStarredStatus: (isStarred, id) => {
				if(isStarred) {
					dispatch(unstarGist(id));
				}
				else {
					dispatch(starGist(id));
				}
			},
			deleteGist: (id) => {
				if(confirm('Haluatko varmasti poistaa tämän gistin?')) {
					dispatch(deleteGist(id));
				}
			}
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGistLayout);
