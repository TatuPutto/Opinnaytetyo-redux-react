import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

/*
import {
	fetchGists,
	sortOldestToNewest,
	sortNewestToOldest,
	filterByLanguage,
	setFilters,
	removeFilter,
} from '../../actions/actions';
*/
import FilterByLanguage from './FilterByLanguage';


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
		this.state = {
			filterViewOpen: false,
			filter: null,
			filteringInputExpanded: false
		};
	}


	fetch(fetchMethod) {
		this.context.router.push('/' + fetchMethod);
	}


	refresh() {
		if(this.props.fetchMethod !== 'search') {
			this.props.filteringActions.refresh(this.props.fetchMethod);
		}
	}

	toggleFilteringView() {
		if(!this.state.filteringInputExpanded) {
			setTimeout(() => {

			}, 100);

		}
		//this.setState({filteringViewOpen: !this.state.filteringViewOpen});
		this.setState({
			filteringInputExpanded: !this.state.filteringInputExpanded
		});


	}


	useFilters(language) {
		this.props.filteringActions.addFilter(language);
	}

	removeFilter(e) {
		this.props.filteringActions.removeFilter(e.currentTarget.textContent);
	}


	render() {
		const {languages} = this.props.filters;
		const type = this.props.fetchMethod;

		return (
			<div className='filters' style={{width: '130%'}}>
				<button id='refresh' onClick={this.refresh}>
					<i className='fa fa-refresh' />
				</button>
				<button id='filter' onClick={this.toggleFilteringView}>
					<i className='fa fa-filter' />
				</button>
				<div className='gist-types'>
					<button className={type == 'gists' ?
							'gist-type-tab active-tab' : 'gist-type-tab'}
						onClick={() => this.fetch('gists')}
					>
						Own gists
					</button>
					<button className={type == 'starred' ?
							'gist-type-tab active-tab' : 'gist-type-tab'}
						onClick={() => this.fetch('starred')}
					>
						Starred
					</button>
				</div>

				{this.state.filteringInputExpanded &&
					<FilterByLanguage
						toggleFilteringView={this.toggleFilteringView}
						actions={this.props.filteringActions}
						activeFilters={languages}
					/>
				}

				{languages &&
					<div className='active-filters'>
						{languages.map((language) =>
							<p
								key={language}
								className='language-filter'
								onClick={this.removeFilter}
							>
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
