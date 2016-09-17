import React from 'react';
import $ from 'jquery';

import Filters from './Filters';
import GistList from './GistList';
import ShowActiveGist from './ShowActiveGist';


require('../../../../css/listing.css');

class ListingPage extends React.Component {
	
	componentDidMount() {
		$('.listing').css('height', ($(window).height() - 50));
	}

	render() {
		/*return (			
			<div className='listing'>
				<div className='contentLeft'>
					<Filters
						chronologicalOrder={this.props.chronologicalOrder}
						filterByLanguage={this.props.filterByLanguage}
						sortByDate={this.props.sortByDate}
						removeFilter={this.props.removeFilter}
						gists={this.props.gists}
					/>
					<GistList 
						gists={this.props.gists} 
						activeGistId={this.props.activeGistId}
						setActive={this.props.setActive}
						isFetchingGists={this.props.isFetchingGists}
					/>
				</div>	
				<div className='contentRight'>	
					<ShowActiveGist
						gist={this.props.activeGist}
						isFetchingGists={this.props.isFetchingGists}
						isFetchingSelectedGist={this.props.isFetchingSelectedGist}
					/>
				</div>	
			</div>
		);*/
		
		return (			
			<div className='listing'>
				<div className='contentLeft'>
					<Filters/>
					<GistList/>
				</div>	
				<div className='contentRight'>	
					<ShowActiveGist/>
				</div>	
			</div>
		);
	
	}
	
}

export default ListingPage;