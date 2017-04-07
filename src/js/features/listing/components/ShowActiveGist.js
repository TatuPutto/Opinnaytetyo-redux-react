import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

//import GistInfo from '../../../components/container/GistInfo';
import GistInfo from '../../../sharedcomponents/GistInfo';
import ReadOnlyGistFile from '../../../components/presentational/reusable/ReadOnlyGistFile';
import GistFiles from '../../../components/presentational/listing/GistFiles';
import Comments from '../../../components/presentational/commentsection/Comments';
import Loading from '../../../sharedcomponents/Loading';
//import {fetchComments} from '../../actions/actions';

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


		if(!isListLoading && isFetching && !fetchError) {
			return (
				<div className='show-active-gist'>
					<Loading />;
				</div>
			);
		} else if(!isListLoading && !isFetching && id !== null && !fetchError) {
			//Renderöidään inforuutu ja tiedostokentät.
			return (
				<div className='show-active-gist'>
					<GistInfo
						actions={this.props.actions}
						gist={this.props.gist}
						userId={this.props.userId}
					/>
					<GistFiles files={files} />
					{/*}
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
					}*/}
				</div>
	   	 	);
		} else {
			return <div>{fetchError}</div>;
		}
	}
}

/*
function mapStateToProps(state) {
	return {
		gist: state.activeGist,
		isListLoading: state.gists.isFetching,
	};
}*/
/*
function mapDispatchToProps(dispatch) {
	return {fetchComments: (id) => dispatch(fetchComments(id))};
}
*/


//export default connect(mapStateToProps)(ShowActiveGist);

export default ShowActiveGist;
