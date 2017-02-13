import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {
	fetchGists,
	sortOldestToNewest,
	sortNewestToOldest,
	filterByLanguage,
	setFilters,
	removeFilter,
} from '../../actions/actions';

import FilteringView from '../presentational/listing/FilteringView';


class Filters extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};


	constructor() {
		super();
		this.fetch = this.fetch.bind(this);
		this.refresh = this.refresh.bind(this);
		this.toggleFilteringView = this.toggleFilteringView.bind(this);
		this.useFilters = this.useFilters.bind(this);
		this.removeFilter = this.removeFilter.bind(this);
		this.state = {filterViewOpen: false, filter: null};
	}


	fetch(e) {
		const fetchMethod = e.target.value;
		this.context.router.push('/Opinnaytetyo_spring_react/' + fetchMethod);
	}


	refresh() {
		this.props.filteringActions.refresh(this.props.fetchMethod);
	}


	toggleFilteringView() {
		this.setState({filteringViewOpen: !this.state.filteringViewOpen});
	}


	useFilters(language) {
		// this.props.filterByLanguage(language, this.props.gists);
		this.props.filteringActions.addFilter(language);
	}

	removeFilter(e) {
		this.props.filteringActions.removeFilter(e.currentTarget.textContent);
	}


	render() {
		const {languages} = this.props.filters;

		return (
			<div className='filtering-options'>


				<div>
				<button className="refresh" onClick={this.refresh}>
					<i className="fa fa-refresh" />
				</button>

				<select
					className="select-fetch-method"
					value={this.props.fetchMethod}
					onChange={this.fetch}
				>
					<option value='gists'>Omat gistit</option>
					<option value='starred'>Suosikit</option>
					<option value='discover'>Discover</option>
				</select>
				</div>
				<FilteringView actions={this.props.filteringActions} />

				{languages &&
					<div className='active-filters'>
						{languages.map((language) =>
							<p key={language} className='filters' onClick={this.removeFilter}>
								{language} <i className='fa fa-remove' />
							</p>
						)}
					</div>
				}
			</div>
		);
	}
}

/*
function mapStateToProps(state) {
	return {
		gists: state.gists.items,
		fetchMethod: state.gists.fetchMethod,
		filter: state.gists.filter
		//chronologicalOrder: state.gists.chronologicalOrder,
		//filterByLanguage: state.gists.filterByLanguage
	}
}


function mapDispatchToProps(dispatch) {
	console.log(filteringActions);

	return {
		fetch: (fetchMethod) => {
			dispatch(fetchGists(fetchMethod));
		},
		refresh: (fetchMethod) => {
			dispatch(fetchGists(fetchMethod));
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
		setFilters: (language) => {
			dispatch(setFilters(language));
		},
		removeFilter: () => {
			dispatch(removeFilter());
		},
		filteringActions: bindActionCreators(filteringActions, dispatch)
	};
	/*
	return {
		filteringActions: bindActionCreators(filteringActions, dispatch);
	};*/

// }
export default Filters;

// export default connect(mapStateToProps, mapDispatchToProps)(Filters);
