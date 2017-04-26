import React from 'react';
import {Link} from 'react-router';

//import {storeSearchQuery, getSearchQueries} from '../../../utility/persistUserInfo';
//import Suggestions from '../../listing/FilterByLanguage/Suggestions';


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
		//const suggestions = getSearchQueries(e.target.value);
		this.setState({input: e.target.value});
	}

	doSearch() {
		//storeSearchQuery(this.state.input);
		this.context.router.push('/search/' + this.state.input);
		this.setState({input: ''});
	}

	render() {
		return (
			<div className='search'>
				<input
					type='text'
					className='search-input'
					placeholder='Hae käyttäjän gistejä'
					defaultValue={this.state.input}
					onChange={this.getInput}
				/>

				<button className='do-search' onClick={this.doSearch}>
					<i class="fa fa-search" />
				</button>


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
