import React from 'react';
import $ from 'jquery';

import GistList from './GistList';
import Filters from '../filtering/components/Filters';
import ShowActiveGist from './ShowActiveGist';


class ListingLayout extends React.Component {
	componentDidMount() {
		$('.header-content').removeClass('narrow');
	}

	render() {
		return (
			<div className='listing'>
				<div className='content-left'>
					<Filters
						fetchMethod={this.props.gists.fetchMethod}
						filters={this.props.filters}
						filteringActions={this.props.filteringActions}
					/>
					<GistList
						gists={this.props.gists}
						activeGistId={this.props.activeGist.id}
						pagination={this.props.pagination}
						setActive={this.props.gistActions.setActive}
						addFilter={this.props.filteringActions.addFilter}
					/>
				</div>
				<div className='content-right'>
					<ShowActiveGist
						actions={this.props.gistActions}
						gist={this.props.activeGist}
						userId={this.props.userId}
					/>
				</div>
			</div>
		);
	}
}

export default ListingLayout;
