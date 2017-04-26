import React, {PropTypes} from 'react';
import GistInfo from '../../../sharedcomponents/GistInfo';
import ReadOnlyGistFile from '../../../sharedcomponents/ReadOnlyGistFile';
import GistFiles from '../../../sharedcomponents/GistFiles';
import Loading from '../../../sharedcomponents/Loading';

class ShowActiveGist extends React.Component {
	render() {
		const isListLoading = this.props.isListLoading;
		/*const {
			id,
			files,
			isFetching,
			isFetchingFiles,
			fetchError,
			comments,
			commentsAmount,
		} = this.props.gist;*/
		console.log(this.props);

		const {gist, isFetching, fetchError} = this.props.gist;

		if(!isListLoading && isFetching && !fetchError) {
			return (
				<div className='show-active-gist'>
					<Loading />
				</div>
			);
		} else if(!isListLoading && !isFetching && this.props.gist.hasOwnProperty('gistId') &&
		 		this.props.gist.gistId && !fetchError) {

			return (
				<div className='show-active-gist'>
					<GistInfo
						gist={this.props.gist}
						userId={this.props.userId}
						actions={this.props.actions}
					/>
					<GistFiles files={this.props.gist.gist.files} />
				</div>
	   	 	);
		} else {
			return <div>{fetchError}</div>;
		}
	}
}

export default ShowActiveGist;
