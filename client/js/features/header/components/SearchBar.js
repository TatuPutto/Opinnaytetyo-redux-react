import React from 'react';
import {Link} from 'react-router';

class SearchBar extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

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
		this.context.router.push('/search/' + this.state.input);
		this.setState({input: ''});
	}

	render() {
		return (
			<div className='search'>
				<input
					type='text'
					className='search-input'
					placeholder='Search gists by user...'
					defaultValue={this.state.input}
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
