import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';


import UserInfo from '../presentational/header/UserInfo';
import NavMenu from '../presentational/header/NavMenu';
import SearchBar from '../presentational/header/SearchBar';


class Header extends React.Component {
	render() {
		return (
			<div className='header'>
				<div className={'header-content'}>
					<SearchBar />
					<NavMenu />
					<UserInfo
						id={this.props.id}
						userLogin={this.props.userLogin}
						avatarUrl={this.props.avatarUrl}
					/>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		id: state.user.id,
		userLogin: state.user.userLogin,
		avatarUrl: state.user.avatarUrl,
	};
}


export default connect(mapStateToProps)(Header);
