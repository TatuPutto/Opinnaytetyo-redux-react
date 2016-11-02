import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';


import UserInfo from '../presentational/header/UserInfo';
import NavMenu from '../presentational/header/NavMenu';

class Header extends React.Component {
	
	render() {
		return (
			<div className='header'>
				<div className='headerContent'>
					<UserInfo userLogin={this.props.userLogin} 
							avatarUrl={this.props.avatarUrl} />
					<NavMenu login={this.props.login} />
				</div>	
			</div>	
		);
	}

}

function mapStateToProps(state) {
	return {
		userLogin: state.user.userLogin,
		avatarUrl: state.user.avatarUrl
	};
}


function mapDispatchToProps(dispatch) {
	return {
		login: () => {
			dispatch(login());
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
