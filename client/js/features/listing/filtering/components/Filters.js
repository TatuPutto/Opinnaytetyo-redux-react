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
		this.state = {filterViewOpen: false, filter: null};
	}


	fetch(e) {
		const fetchMethod = e.target.value;
		this.context.router.push('/' + fetchMethod);
	}


	refresh() {
		if(this.props.fetchMethod !== 'search') {
			this.props.filteringActions.refresh(this.props.fetchMethod);
		}
	}


	toggleFilteringView() {
		this.setState({filteringViewOpen: !this.state.filteringViewOpen});
	}


	useFilters(language) {
		this.props.filteringActions.addFilter(language);
	}

	removeFilter(e) {
		this.props.filteringActions.removeFilter(e.currentTarget.textContent);
	}


	render() {
		const {languages} = this.props.filters;

		return (
			<div className='filters'>
				<div className='filtering-options'>
					<button className='refresh' onClick={this.refresh}>
						<i className='fa fa-refresh' />
					</button>

					<select
						className='select-fetch-method'
						value={this.props.fetchMethod}
						onChange={this.fetch}
					>
						<option value='gists'>Omat gistit</option>
						<option value='starred'>Suosikit</option>
						<option value='discover'>Discover</option>
						<option value='search' disabled>Haku</option>
					</select>

					<FilterByLanguage
						actions={this.props.filteringActions}
						activeFilters={languages}
					/>
				</div>


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

export default Filters;
