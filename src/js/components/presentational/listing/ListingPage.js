import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import GistList from './GistList';
import Filters from '../../container/Filters';
import ShowActiveGist from '../../container/ShowActiveGist';

import { fetchGists, fetchSelectedGist, sortOldestToNewest, sortNewestToOldest, 
		addFilter, removeFilter } from '../../../actions/actions';
import { filterByLanguage } from '../../../utility/filterByLanguage';

require('../../../../css/listing.css');

class ListingPage extends React.Component {
	
	componentDidMount() {
		$('.listing').css('height', ($(window).height() - 95));
	}

	render() {
		return (			
			<div className='listing'>
				<Filters 
					fetchMethod={this.props.gists.fetchMethod} 
					filters={this.props.filters} 
					filteringActions={this.props.filteringActions}>
				</Filters>
							
				<div className='contentLeft'>
					<GistList 
						gists={this.props.gists}
						activeGistId={this.props.activeGist.gistId} 
						pagination={this.props.pagination}
						setActive={this.props.gistActions.setActive}>
					</GistList>
				</div>	
					
				<div className='contentRight'>	
					<ShowActiveGist 
						gist={this.props.activeGist} 
						gistActions={this.props.gistActions} 
						isFetchingGists={this.props.gists.isFetching} 
						userId={this.props.userId}>
					</ShowActiveGist>
				</div>	
			</div>
		);	
	}
	
}
import { store } from '../../../createStore';

let activeId;


//Luetaan listausnäkymän tarvitsema tiladata 
//ja määritellään miten data muutetaan attribuuttidataksi.
function mapStateToProps(state) {
	activeId = state.activeGist.gistId;

	return {
		activeGist: state.activeGist,
		filters: state.filters,
		gists: {
			...state.gists,
			items: filterByLanguage(state.filters.languages, state.gists.items),
		},
		pagination: state.pagination,
		userId: state.user.id
	};
}



//Määritellään listausnäkymän toiminnot.
function mapDispatchToProps(dispatch) {
	return {
		//Suodatustoiminnot.
		filteringActions: {
			sortOldestToNewest: () => dispatch(sortOldestToNewest()),
		 	sortNewestToOldest: () => dispatch(sortNewestToOldest()),
		 	addFilter: (language) => dispatch(addFilter(language)),
		 	removeFilter: (language) => dispatch(removeFilter(language)),
		 	refresh: (fetchMethod) => dispatch(fetchGists(fetchMethod))	
		},
		
		//Aktiivisen gistin toiminnot.
		gistActions: {
			setActive: (id) => {
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
				if (confirm('Haluatko varmasti poistaa tämän gistin?')) {
					dispatch(deleteGist(id));
				}
			},
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
