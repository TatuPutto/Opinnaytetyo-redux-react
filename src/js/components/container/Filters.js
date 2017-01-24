import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {
	fetchGists,
	sortOldestToNewest,
	sortNewestToOldest,
	filterByLanguage,
	setFilters,
	removeFilter
} from '../../actions/actions';

import FilteringView from '../presentational/listing/FilteringView';


class Filters extends React.Component {
	static propTypes = {
		gists: PropTypes.array.isRequired,
		fetch: PropTypes.func.isRequired,
		chronologicalOrder: PropTypes.bool.isRequired,
		sortByDate: PropTypes.func.isRequired,
		filterByLanguage: PropTypes.func.isRequired,
		removeFilter: PropTypes.func.isRequired,
	};


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
		this.context.router.push('/' + fetchMethod);
	}


	refresh() {
		this.props.filteringActions.refresh(this.props.fetchMethod);
	}


	toggleFilteringView() {
		this.setState({filteringViewOpen: !this.state.filteringViewOpen});
	}


	useFilters(language) {
		//this.props.filterByLanguage(language, this.props.gists);
		this.props.filteringActions.addFilter(language);

	}

	removeFilter(e) {
		this.props.filteringActions.removeFilter(e.currentTarget.textContent);
	}


	render() {


		/*const { fetchMethod, chronologicalOrder, sortByDate,
				filterByLanguage, removeFilter, gists, filter, filteringActions } = this.props;*/
		//console.log(this.props.filteringActions);
		const {languages} = this.props.filters;
		//const { removeFilter } = this.props.filteringActions;

		//const languages = ['Java', 'PHP', 'JavaScript'];



		return (
			<div className='filters'>
				<div className='filteringOptions'>

					<input type='button' id='refresh' onClick={this.refresh}/>
					<select value={this.props.fetchMethod}
							onChange={this.fetch}>
						<option value='gists'>Omat gistit</option>
						<option value='starred'>Suosikit</option>
						<option value='discover'>Discover</option>
					</select>

					<input type='button' id='openFilters' value='Suodata'
							onClick={this.toggleFilteringView}/>




					{this.state.filteringViewOpen &&
						<FilteringView
							removeFilter={this.props.filteringActions.removeFilter}
							bringFilters={this.useFilters}
							closeView={this.toggleFilteringView}/>
					}

				</div>

				{languages &&
					<div className='currentFilters'>
						{languages.map(language =>
							<p className='langFilter' onClick={this.removeFilter}>
								{language}
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

//}
export default Filters;

//export default connect(mapStateToProps, mapDispatchToProps)(Filters);
