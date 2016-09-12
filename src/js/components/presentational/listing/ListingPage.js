import React from 'react';
import $ from 'jquery';

import Filters from './Filters';
import GistList from './GistList';
import ShowActiveGist from './ShowActiveGist';

class ListingPage extends React.Component {
	
	componentDidMount() {
		$('.listing').css('height', ($(window).height() - 50));
	}

	render() {
		return (			
			<div className='listing'>
				<div className='contentLeft'>
					<Filters
						chronologicalOrder={this.props.chronologicalOrder}
						filterByLanguage={this.props.filterByLanguage}
						removeFilter={this.props.removeFilter}
						gists={this.props.gists}
					/>
					<GistList 
						gists={this.props.gists} 
						activeGistId={this.props.activeGistId}
						setActive={this.props.setActive}
						isLoading={this.props.isLoadingGists}
					/>
				</div>	
				<div className='contentRight'>	
					<ShowActiveGist
						gist={this.props.activeGist}
						isLoadingGists={this.props.isLoadingGists}
						isLoadingSelectedGist={this.props.isLoadingSelectedGist}
					/>
				</div>	
			</div>
		);
	}
	
}

export default ListingPage;