import React from 'react';
import $ from 'jquery';

import { setSuggestions } from '../../../utility/suggestions';


class FilteringView extends React.Component {
	
	constructor() {
		super();
		this.filterResults = this.filterResults.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.autoComplete = this.autoComplete.bind(this);
		this.removeFilter = this.removeFilter.bind(this);
		this.state = {
			suggestions: [],
			filter: null
		}
	}
	
	
	getSuggestions(e) {
		const value = e.target.value;
		const suggestions = setSuggestions(value);
		
		this.setState({
			suggestions	
		});
	}
	
	
	filterResults() {
		const language = $('.filterInput').val();

		if(language) {
			//{this.props.filter(language, this.props.gists)}
		
			this.props.bringFilters(language);
			this.props.closeView();
			 
			this.setState({
				suggestions: [],
				filter: language
			});
		}
	}
	

	autoComplete(e) {	
		this.props.bringFilters(e.currentTarget.textContent);
		this.props.closeView();
		
		this.setState({	
			suggestions: []
		});
	}
	
	
	removeFilter() {
		this.setState({
			filter: null
		});
		
		{this.props.removeFilter()}
	}
	
	
	
	render() {
		const suggestions = this.state.suggestions.map((suggestion) => {
			return (
				<li key={suggestion} onClick={this.autoComplete}>
					{suggestion}
				</li>
			);
		});
		
		
		return (
			<div className='filteringView'>
			{/*{!this.state.filter && */}
					<div>
						<input type='text' className='filterInput' 
								placeholder='Ohjelmointikieli' 
								onChange={this.getSuggestions} />
										
						<input type='button' value='Käytä suodattimia'
								onClick={this.filterResults}  />
					</div>		
						
					
				{/*{this.state.filter &&
					<input type='button' className='langFilter' value={this.state.filter}
							onClick={this.removeFilter} />
				}*/}
				
				{this.state.suggestions.length > 0 &&
					<div className='suggestions'>
						<ul>
							{suggestions}
						</ul>
					</div>
				}
				
			</div>
		);
	}
	
}

export default FilteringView;