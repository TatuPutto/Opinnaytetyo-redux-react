import React from 'react';
import $ from 'jquery';

import Suggestions from './FilteringView/Suggestions';
import {setSuggestions} from '../../../utility/suggestions';


class FilteringView extends React.Component {
	constructor() {
		super();
		this.addFilter = this.addFilter.bind(this);
		this.filterResults = this.filterResults.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.showSuggestions = this.showSuggestions.bind(this);
		this.hideSuggestions = this.hideSuggestions.bind(this);
		this.autoComplete = this.autoComplete.bind(this);
		this.removeFilter = this.removeFilter.bind(this);
		this.state = {suggestions: [], suggestionsVisible: false, filter: null};
	}


	getSuggestions(e) {
		const value = e.target.value;
		const suggestions = setSuggestions(value);
		this.setState({suggestions});
	}

	showSuggestions() {
		this.setState({suggestionsVisible: true});
	}

	hideSuggestions() {
		this.setState({suggestionsVisible: false});
	}

	filterResults() {
		const language = $('.filter-input').val();

		if(language) {
			this.addFilter(language);
			this.setState({suggestions: [], filter: language});
		}
	}


	autoComplete(e) {
		this.addFilter(e.currentTarget.textContent);
		this.setState({suggestions: []});
	}


	addFilter(language) {
		this.props.actions.addFilter(language);
		$('.filter-input').val('');
	}

	removeFilter() {
		this.setState({filter: null});
		this.props.actions.removeFilter();
	}


	render() {
		console.log(this.state.suggestionsVisible);

		return (
			<div className='filtering-view'>
				<input
					type='text'
					className='filter-input'
					placeholder='Ohjelmointikieli'
					onFocus={this.showSuggestions}
					onChange={this.getSuggestions}
				/>

				<button className='do-filtering' onClick={this.filterResults}>
					<i className='fa fa-filter' />
				</button>

				{this.state.suggestionsVisible && this.state.suggestions.length > 0 &&
					<Suggestions
						suggestions={this.state.suggestions}
						autoComplete={this.autoComplete}
						hideSuggestions={this.hideSuggestions}
					/>
				}
			</div>
		);
	}
}

export default FilteringView;
