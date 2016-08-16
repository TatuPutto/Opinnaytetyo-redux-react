import React from 'react';
import { connect } from 'react-redux';

import Gist from '../presentational/single/Gist';

import { fetchSelectedGist } from '../../actions/actions';



function mapStateToProps(state) {
	return {
		activeGist: state.default.activeGist,
		isLoading: state.default.isLoadingActive
	}
}

/*
const mapDispatchToProps = (dispatch) => {
	//Erotellaan gistin id URL-osoitteesta
	let gistId = window.location.hash.split("/")[2].split("?")[0];
	
	return {
		getGist: () => {
			dispatch(fetchSelectedGist(gistId))
		}
	}
}

*/
const PassGistToSingle = connect(
		mapStateToProps 
		//mapDispatchToProps
)(Gist);


export default PassGistToSingle;