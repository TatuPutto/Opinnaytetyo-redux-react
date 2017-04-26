import React, {PropTypes} from 'react';
import GistInfo from '../../../sharedcomponents/GistInfo';
import ReadOnlyGistFile from '../../../sharedcomponents/ReadOnlyGistFile';
import GistFiles from '../../../sharedcomponents/GistFiles';
import Loading from '../../../sharedcomponents/Loading';

class ShowActiveGist extends React.Component {
	render() {
		const isListLoading = this.props.isListLoading;
		const {item, isFetching, fetchError} = this.props.activeGist;

		if(!isListLoading && isFetching && !fetchError) {
			return (
				<div className='show-active-gist'>
					<Loading />
				</div>
			);
		} else if(!isListLoading && !isFetching && !fetchError) {
			return (
				<div className='show-active-gist'>
					<GistInfo
						gist={this.props.activeGist}
						userId={this.props.userId}
						actions={this.props.actions}
					/>
					<GistFiles files={item.files} />
				</div>
	   	 	);
		} else {
			return <div>{fetchError}</div>;
		}
	}
}

export default ShowActiveGist;
