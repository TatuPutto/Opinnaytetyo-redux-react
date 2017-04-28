import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Suggestions from './Suggestions';
import getSuggestions from '../../../../utility/getsuggestions';


class FilterByLanguage extends React.Component {
	constructor() {
		super();
		this.addFilter = this.addFilter.bind(this);
		this.filterResults = this.filterResults.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.showSuggestions = this.showSuggestions.bind(this);
		this.hideSuggestions = this.hideSuggestions.bind(this);
		this.autoComplete = this.autoComplete.bind(this);
		this.removeFilter = this.removeFilter.bind(this);
		this.getValueOnEnterPress = this.getValueOnEnterPress.bind(this);
		this.state = {suggestions: [], suggestionsVisible: true, filter: null};
	}

	componentDidMount() {
        // Suljetaan dropdown, jos klikataan komponentin ulkopuolelle.
        $(document).on('click', () => this.props.toggleFilteringView());
		ReactDOM.findDOMNode(this.refs.filteringInput).focus();
    }

    componentWillUnmount() {
        // Poistetaan kuuntelija, kun komponentti irrotetaan DOM:sta.
        $(document).off('click');
    }

	getValueOnEnterPress(e) {
		const isEnterPressed = e.keyCode === 13;
		const language = e.currentTarget.value;

		if(isEnterPressed && language) {
			this.props.actions.addFilter(language);
			e.currentTarget.value = '';
			this.setState({suggestions: [], suggestionsVisible: false});
		}
	}

	getSuggestions(e) {
		const input = e.target.value;
		const suggestions = getSuggestions(input, this.props.activeFilters);
		this.setState({suggestions, suggestionsVisible: true});
	}

	showSuggestions() {
		/*setTimeout(() => {
			if(this.state.suggestionsVisible) {
				this.setState({suggestionsVisible: false});
			} else {
				this.setState({suggestionsVisible: true});
			}
		}, 200);*/
	}

	hideSuggestions() {
		//this.setState({suggestionsVisible: false});
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
		return (
			<div className='filter-by-language'>
				<input
					type='text'
					ref='filteringInput'
					className='filtering-input'
					placeholder='Filter by programming language...'
					onChange={this.getSuggestions}
					onKeyUp={this.getValueOnEnterPress}
				/>

				{this.state.suggestionsVisible &&
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

export default FilterByLanguage;
