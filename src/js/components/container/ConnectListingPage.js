import React from 'react';
import { connect } from 'react-redux';

import ListingPage from '../presentational/listing/ListingPage';
import { 
	fetchUserInfo, 
	fetchGists, 
	fetchSelectedGist, 
	sortOldestToNewest, 
	sortNewestToOldest, 
	filterByLanguage, 
	removeFilter 
} from '../../actions/actions';

require('../../../css/Listing.css');

let activeId = null;

function mapStateToProps(state) {
	return {
		gists: state.gists.items,
		activeGist: state.activeGist.gist,
		activeGistId: state.activeGist.gistId,
		isLoadingGists: state.gists.isFetching,
		isLoadingSelectedGist: state.activeGist.isFetching,
		chronologicalOrder: state.gists.chronologicalOrder,
		filterByLanguage: state.gists.filterByLanguage
	}
}


function mapDispatchToProps(dispatch) {
	return {
		setActive: (id) => {
			if(id !== activeId) {
				dispatch(fetchSelectedGist(id));
			}
		},
		sortByDate: (gists, chronologicalOrder) => {
			if(chronologicalOrder) {
				dispatch(sortOldestToNewest(gists));
			}
			else {
				dispatch(sortNewestToOldest(gists));
			}
		},
		filterByLanguage: (language, gists) => {
			dispatch(filterByLanguage(language, gists));
		},
		removeFilter: () => {
			dispatch(removeFilter());
		}
	};
}

const ConnectListingPage = connect(mapStateToProps, mapDispatchToProps)(ListingPage);


export default ConnectListingPage;