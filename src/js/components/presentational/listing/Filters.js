import React from 'react';

class Filters extends React.Component {
	
	render() {
		return (
			<div className='filters'>
				<input 
					type='button'
					value={this.props.chronologicalOrder ? 
						'Vanhimmat ensin' : 'Uusimmat ensin'}
					onClick={() => this.props.sortByDate(
						this.props.gists, !this.props.chronologicalOrder
					)} 
				/>
				<input type='button' value='Suosikit' />
				<input type='button' 
					value='Suodata' 
					onClick={() => this.props.filterByLanguage('Java', this.props.gists)}
				/>
				<input type='button' 
					value='Suodata' 
					onClick={this.props.removeFilter}
				/>
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