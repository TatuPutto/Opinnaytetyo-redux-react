import {connect} from 'react-redux';
import ListingLayout from './ListingLayout';
import {fetchGists, refresh} from '../fetchgists/duck';
import {addFilter, removeFilter} from '../filtering/duck';
import {filterByLanguage} from '../../../utility/filterByLanguage';
import {
	fetchSelectedGist,
	starGist,
	unstarGist,
	checkIfForked,
	deleteGist,
} from '../../fetchsinglegist/duck';


let activeId;
let fetchParams;

function mapStateToProps(state) {
	activeId = state.activeGist.gistId;
	fetchParams = {
		method: state.gists.fetchMethod,
		page: state.gists.page
	};

	return {
		gists: {
			...state.gists,
			items: filterByLanguage(state.filters.languages, state.gists.items)
		},
		activeGist: state.activeGist,
		filters: state.filters,
		userId: state.user.id,
	};
}



//Määritellään listausnäkymän toiminnot.
function mapDispatchToProps(dispatch) {
	return {
		//Suodatustoiminnot.
		filteringActions: {
		 	addFilter: (language) => dispatch(addFilter(language)),
		 	removeFilter: (language) => dispatch(removeFilter(language)),
		 	refresh: () => dispatch(refresh(fetchParams.method, fetchParams.page)),
		},

		//Aktiivisen gistin toiminnot.
		gistActions: {
			setActive: (id, gist) => {
				if(id !== activeId) {
					dispatch(fetchSelectedGist(id));
				}
			},
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

export default connect(mapStateToProps, mapDispatchToProps)(ListingLayout);
