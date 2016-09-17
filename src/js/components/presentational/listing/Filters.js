import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { sortOldestToNewest, sortNewestToOldest, 
	filterByLanguage, removeFilter } from '../../../actions/actions';

class Filters extends React.Component {
	
	render() {
		const { chronologicalOrder, sortByDate, 
					filterByLanguage, removeFilter, gists } = this.props;
		
		return (
			<div className='filters'>
				<input type='button'
					value={chronologicalOrder ? 
							'Vanhimmat ensin' : 'Uusimmat ensin'}
					onClick={() => sortByDate(gists, !chronologicalOrder)} 
				/>
				<input type='button' value='Suosikit' />
				<input type='button' value='Suodata' 
					onClick={() => filterByLanguage('Java', gists)} />
				<input type='button' value='Poista suodatin' onClick={removeFilter} />
				{/*<select onChange={() => this.props.sortByDate(
						this.props.gists,
						true
				)}>
					<option value='newestToOldest'>Uusimmat ensin</option>
					<option value='oldestToNewest'>Vanhimmat ensin</option>
				</select>*/}
			</div>
		);
	}
	
}


Filters.propTypes = {
	gists: PropTypes.array.isRequired,
	chronologicalOrder: PropTypes.bool.isRequired,
	sortByDate: PropTypes.func.isRequired,
	filterByLanguage: PropTypes.func.isRequired,
	removeFilter: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
	return {
		gists: state.gists.items,
		chronologicalOrder: state.gists.chronologicalOrder,
		filterByLanguage: state.gists.filterByLanguage
	}
}


function mapDispatchToProps(dispatch) {
	return {
		sortByDate: (gists, chronologicalOrder) => {
			console.log(chronologicalOrder);
			
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