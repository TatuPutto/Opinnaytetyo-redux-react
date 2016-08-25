import React from 'react';
import { connect } from 'react-redux';
import { fetchSelectedGist, login } from '../../actions/actions';


import Header from '../presentational/header/Header';

require('../../../css/Header.css');


function mapStateToProps(state) {
	return {
		userLogin: state.default.userLogin,
		avatarUrl: state.default.avatarUrl
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