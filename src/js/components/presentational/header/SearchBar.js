import React from 'react';


class SearchBar extends React.Component {
	constructor() {
		super();
		this.getInput = this.getInput.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.state = {
			input: ''	
		};
	}
	
	getInput(e) {
		this.setState({ input: e.target.value });
	}
	
	doSearch() {
		this.props.search(this.state.input);
	}
	
	
	render() {
		return (
			<div className='search'>
				<input type='text' placeholder='Haku' onChange={this.getInput} />
				<input type='button' value='Hae' onClick={this.doSearch} />
			</div>
		);
	}	
}

export default SearchBar;