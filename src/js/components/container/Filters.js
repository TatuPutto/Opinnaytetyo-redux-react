import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchGists, sortOldestToNewest, sortNewestToOldest, 
	filterByLanguage, removeFilter } from '../../actions/actions';

	
import FilteringView from '../presentational/listing/FilteringView';
	
	
import $ from 'jquery';
	
	
const colors = require("../../../static/colors.json");
	

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
		this.state = {
			filterViewOpen: false,
			filter: null
		};
		
		
		this.useFilters = this.useFilters.bind(this);
		this.removeFilter = this.removeFilter.bind(this);
	}
	
	
	fetch(e) {
		const fetchMethod = e.target.value;
		this.context.router.push('/' + fetchMethod);
		//{this.props.fetch(fetchMethod)}
	}
	
	
	refresh() {
		{this.props.refresh(this.props.fetchMethod)}
	}
	
	
	toggleFilteringView() {
		let isOpen;
		isOpen = this.state.filteringViewOpen ? true : false;
		
		this.setState({
			filteringViewOpen: !isOpen
		});
	}
	
	
	useFilters(language) {
		{this.props.filterByLanguage(language, this.props.gists)}
	}
	
	removeFilter() {
		{this.props.removeFilter()}
	}
	
	
	render() {
		const { fetchMethod, chronologicalOrder, sortByDate, 
				filterByLanguage, removeFilter, gists, filter } = this.props;
	
		return (
			<div className='filters'>
				<div className='fitleringOptions'>
					<select value={fetchMethod} onChange={this.fetch}>
						<option value='gists'>Omat gistit</option>
						<option value='starred'>Suosikit</option>
						<option value='discover'>Discover</option>
					</select>
			
					{/*}<input type='button' value='Suosikit' 
						onClick={this.fetchStarredGists}></input>*/}
					
				
					<input type='button' id='openFilters' value='Suodata' 
							onClick={this.toggleFilteringView} />
					
				
					<input type='button' id='refresh' onClick={this.refresh} />
						
					
				
					{this.state.filteringViewOpen &&
						<FilteringView filter={filterByLanguage} 
							removeFilter={removeFilter} gists={gists}
							bringFilters={this.useFilters}
							closeView={this.toggleFilteringView} />
					}
					
					
					
				
					
					
					
					
				
					
					{/*<input type='button' value='Poista suodatin' 
						onClick={removeFilter} />*/}
					
							{/*onClick={() => filterByLanguage('Java', gists)}*} />
					<input type='button' value='Poista suodatin' 
							onClick={removeFilter} />
							
					{/*<select onChange={() => sortByDate(gists,true)}>*/}
					
					{/*}
						<option value='newestToOldest'>Uusimmat ensin</option>
						<option value='oldestToNewest'>Vanhimmat ensin</option>
					</select>*/}
				</div>
				
				<div className='currentFilters'>
					{filter &&
						<p className='langFilter'onClick={this.removeFilter}>
							{filter}
						</p>		
					}
				</div>
				
				
			</div>
		);
		
	}
	
}


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
		removeFilter: () => {
			dispatch(removeFilter());
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Filters);