import React from 'react';


class SearchBar extends React.Component {
	constructor() {
		super();
		this.getInput = this.getInput.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.state = {input: ''};
	}

	getInput(e) {
		this.setState({input: e.target.value});
	}

	doSearch() {
		this.props.search(this.state.input);
	}

	render() {
		return (
			<div className='search col-lg-5'>
				<input
					type='text'
					className='search-input'
					placeholder='Haku'
					onChange={this.getInput}
				/>

				<button className='do-search' onClick={this.doSearch}>
					<i class="fa fa-search" />
				</button>
			</div>
		);
	}
}

export default SearchBar;
