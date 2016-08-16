import React from 'react';

class Filters extends React.Component {
	
	render() {
		var spanStyle = {background: 'grey', height: '50px'};
	
		return (
			<div style={spanStyle}>
				<input type='button' value={this.props.chronologicalOrder ? 
						'Vanhimmat/uusimmat' : 'Uusimmat/vanhimmat'}
						onClick={() => this.props.sortByDate(
								this.props.gists, !this.props.chronologicalOrder
						)}/>
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