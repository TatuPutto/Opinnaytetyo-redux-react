import React from 'react';
import { connect } from 'react-redux';
import { fetchSelectedGist, login } from '../../actions/actions';


import Header from '../presentational/header/Header';

require('../../../css/Header.css');


function mapStateToProps(state) {
	console.log(state.user.userLogin)
	console.log(state.user.avatarUrl)
	return {
		userLogin: state.user.userLogin,
		avatarUrl: state.user.avatarUrl
		//userLogin: 'TatuPutto',
		//avatarUrl: 'https://avatars.githubusercontent.com/u/408570?v=3'
	};
}


function mapDispatchToProps(dispatch) {
	return {
		login: () => {
			dispatch(login());
		}
	};
}

const PassInfoToHeader = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);


export default PassInfoToHeader;