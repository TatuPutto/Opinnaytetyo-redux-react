import {connect} from 'react-redux';
import HeaderLayout from './HeaderLayout';

function mapStateToProps(state) {
	return {
		id: state.user.id,
		username: state.user.username,
		avatarUrl: state.user.avatarUrl,
	};
}

export default connect(mapStateToProps)(HeaderLayout);
