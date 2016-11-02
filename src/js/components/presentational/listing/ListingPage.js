import React from 'react';
import $ from 'jquery';

import GistList from './GistList';
import Filters from '../../container/Filters';
import ShowActiveGist from '../../container/ShowActiveGist';


require('../../../../css/listing.css');

class ListingPage extends React.Component {
	
	componentDidMount() {
		$('.listing').css('height', ($(window).height() - 95));
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
				<Filters/>
				<div className='contentLeft'>
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