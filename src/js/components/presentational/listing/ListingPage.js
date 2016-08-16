import React from 'react';
import $ from 'jquery';

import Filters from './Filters';
import GistList from './GistList';
import ShowActiveGist from './ShowActiveGist';

class ListingPage extends React.Component {
	
	componentDidMount() {
		$('.contentLeft').css('height', '1015px');
		$('.contentRight').css('height', '1050px');
	}
	
	render() {
		return (			
			<div className='listing'>
				<div className='contentLeft'>
					<Filters
						chronologicalOrder={this.props.chronologicalOrder}
						sortByDate={this.props.sortByDate}
						gists={this.props.gists}
					/>
					<GistList 
						gists={this.props.gists} 
						activeGistId={this.props.activeGistId}
						setActive={this.props.setActive}
						isLoading={this.props.isLoadingList}
					/>
				</div>	
				<div className='contentRight'>	
					<ShowActiveGist
						gist={this.props.activeGist}
						isLoadingList={this.props.isLoadingList}
						isLoadingSelectedGist={this.props.isLoadingSelectedGist}
					/>
				</div>	
			</div>
		);
	}
	
}

export default ListingPage;