import React from 'react';
import { connect } from 'react-redux';

import ListingPage from '../presentational/listing/ListingPage';
import { fetchUserInfo, fetchGists, fetchSelectedGist, 
		sortOldestToNewest, sortNewestToOldest } from '../../actions/actions';

require('../../../css/Listing.css');

let activeId = null;

function mapStateToProps(state) {
	activeId = state.default.activeGistId;
	
	return {
		gists: state.default.gists,
		activeGist: state.default.activeGist,
		activeGistId: state.default.activeGistId,
		isLoadingList: state.default.isLoadingList,
		isLoadingSelectedGist: state.default.isLoadingSelectedGist,
		chronologicalOrder: state.default.chronologicalOrder
	}
}


function mapDispatchToProps(dispatch) {
	return {
		setActive: (id) => {
			//if(id !== activeId) {
				dispatch(fetchSelectedGist(id));
			//}
		},
		sortByDate: (gists, chronologicalOrder) => {
			if(chronologicalOrder) {
				dispatch(sortOldestToNewest(gists));
			}
			else {
				dispatch(sortNewestToOldest(gists));
			}
		}
	};
}

const PassGistsToListingPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListingPage);


export default PassGistsToListingPage;