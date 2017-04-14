import {connect} from 'react-redux';
import {fetchGists} from '../../fetchgists/duck';
import HeaderLayout from './HeaderLayout';


function mapStateToProps(state) {
	return {
		id: state.user.id,
		userLogin: state.user.userLogin,
		avatarUrl: state.user.avatarUrl,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		login: () => dispatch(login()),
		search: (user) => dispatch(fetchGists('search', null, user))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLayout);
