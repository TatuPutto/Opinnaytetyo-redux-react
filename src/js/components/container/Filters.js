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
		this.open = this.open.bind(this);
		
		this.state = {
			filterViewOpen: false
		};
	}
	
	
	fetch(e) {
		const fetchMethod = e.target.value;
		this.context.router.push('/' + fetchMethod);
		//{this.props.fetch(fetchMethod)}
	}
	
	
	handleRefresh() {
		{this.props.refresh(this.propsfetchMethod)}
	}
	
	
	open() {
		this.setState({
			filteringViewOpen: true
		});
		//{this.props.filterByLanguage(language, this.props.gists)}
	}
	
	
	render() {
		const { fetchMethod, chronologicalOrder, sortByDate, 
				filterByLanguage, removeFilter, gists } = this.props;
		
		return (
			<div className='filters'>
			<input type='button'
						value={chronologicalOrder ? 
								'Vanhimmat ensin' : 'Uusimmat ensin'}
						onClick={() => sortByDate(gists, !chronologicalOrder)} />
				{/*}<input type='button' value='Suosikit' 
					onClick={this.fetchStarredGists}></input>*/}
				
				{/*<input type='button' id='refresh' value='Päivitä' />*/}
				
				<select value={fetchMethod} onChange={this.fetch}>
					<option value='gists'>Omat gistit</option>
					<option value='starred'>Suosikit</option>
					<option value='discover'>Discover</option>
				</select>
				
		
				
				
				
				<input type='button' value='Suodata' onClick={this.open} />
				
				
				{this.state.filteringViewOpen &&
					<FilteringView filter={filterByLanguage} 
						removeFilter={removeFilter} gists={gists} />
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
		);
	}
	
}


function mapStateToProps(state) {
	return {
		gists: state.gists.items,
		fetchMethod: state.gists.fetchMethod,
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