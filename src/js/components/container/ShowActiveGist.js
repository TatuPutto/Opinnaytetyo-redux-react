import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import GistInfo from './GistInfo';
import ReadOnlyGistFile from '../presentational/reusable/ReadOnlyGistFile';
import GistFiles from '../presentational/listing/GistFiles';
import Comments from '../presentational/commentsection/Comments';

import {fetchComments} from '../../actions/actions';

class ShowActiveGist extends React.Component {
	render() {
		const isListLoading = this.props.isListLoading;
		const {
			id,
			files,
			isFetching,
			isFetchingFiles,
			fetchError,
			comments,
			commentsAmount,
		} = this.props.gist;
		console.log(this.props.fetchComments);

		if(!isListLoading && isFetching && !fetchError) {
			return <div className='loading'></div>;
		} else if(!isListLoading && !isFetching && id !== null && !fetchError) {
			//Renderöidään inforuutu ja tiedostokentät.
			return (
				<div className='show-active-gist'>
					<GistInfo />
					<GistFiles files={files} />

					{commentsAmount === 0 &&
						<p>Ei kommentteja</p>
					}
					{commentsAmount > 0 && comments.length < 1 &&
						<p onClick={() => this.props.fetchComments(id)}>
							Näytä kommentit ({commentsAmount})
						</p>
					}
					{commentsAmount > 0 && comments.length > 0 &&
						<Comments comments={comments} />
					}
				</div>
	   	 	);
		} else {
			return <div>{fetchError}</div>;
		}
	}
}


function mapStateToProps(state) {
	return {
		gist: state.activeGist,
		isListLoading: state.gists.isFetching,
	};
}

function mapDispatchToProps(dispatch) {
	return {fetchComments: (id) => dispatch(fetchComments(id))};
}



export default connect(mapStateToProps, mapDispatchToProps)(ShowActiveGist);
