import React from 'react';

class Filters extends React.Component {
	
	render() {
		const {chronologicalOrder, sortByDate, 
					filterByLanguage, removeFilter, gists} = this.props;
		
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


export default Filters;