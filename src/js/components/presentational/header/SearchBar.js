import React from 'react';
import {Link} from 'react-router';

import {storeSearchQuery, getSearchQueries} from '../../../utility/persistUserInfo';
import Suggestions from '../listing/FilterByLanguage/Suggestions';


class SearchBar extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super();
		this.getInput = this.getInput.bind(this);
		this.doSearch = this.doSearch.bind(this);
			this.clear = this.clear.bind(this);
		this.state = {input: '', suggestions: []};
	}

	clear() {
		localStorage.clear();
	}

	getInput(e) {
		const suggestions = getSearchQueries(e.target.value);
		this.setState({input: e.target.value, suggestions});
	}

	doSearch() {
		storeSearchQuery(this.state.input);
		this.context.router.push('/opinnaytetyo/search/' + this.state.input);
	}

	render() {
		return (
			<div className='search'>
				<input
					type='text'
					className='search-input'
					placeholder='Haku'
					onChange={this.getInput}
				/>

				<button className='do-search' onClick={this.doSearch}>
					<i class="fa fa-search" />
				</button>
				<button className='do-search' onClick={this.clear}>
					<i class="fa fa-search" />
				</button>
				{this.state.suggestions.length > 0 &&
					<Suggestions suggestions={this.state.suggestions} />
				}

				{/* }<Link to={'/opinnaytetyo/search/' + this.state.input}>
					<button className='do-search'>
						<i class="fa fa-search" />
					</button>
				</Link>*/}
			</div>
		);
	}
}

export default SearchBar;
