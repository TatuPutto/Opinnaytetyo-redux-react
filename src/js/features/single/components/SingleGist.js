import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';

import GistInfo from '../../../components/container/GistInfo';
import GistFiles from '../../../sharedcomponents/GistFiles';
import Comments from '../../../components/presentational/commentsection/Comments';
import Loading from '../../../sharedcomponents/Loading';


import {
	fetchSelectedGist,
	fetchComments
} from '../../../actions/actions';


class SingleGist extends React.Component {
	static propTypes = {gist: PropTypes.object.isRequired};

	componentDidMount() {
		$('.header-content').addClass('narrow');
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.gist.hasOwnProperty('comments')) {
			if(nextProps.gist.comments > 0 && this.props.comments.length === 0) {
				this.props.fetchComments(nextProps.gist.id);
			}
		}
	}


	render() {
		const {
			id,
			files,
			isFetching,
			fetchError,
		} = this.props.gist;


		if(isFetching || id === null && !fetchError) {
			return (
				<div className='single'>
					<Loading />
				</div>
			);
		} else if(!isFetching && id !== null && !fetchError) {
			return (
				<div className='single'>
					<div className='show-active-gist'>
						<GistInfo />
						<GistFiles files={files} />

						{/*
						<div className='gist-comments'>
							}{comments.length === 0 &&
								<p>Ei kommentteja</p>
							}
							{comments.length > 0 &&
								<Comments comments={comments} />
							}
						</div>
						*/}
					</div>
				</div>
	   	 	);
		} else {
			return (
				<div className='single'>
					<div className='error'>
						Etsimääsi gistiä ei löytynyt ({fetchError}).
					</div>
				</div>
			);
		}
	}
}


function mapStateToProps(state) {
	return {gist: state.activeGist};
}

//Määritellään yksittäisen gistin näkymän toiminnot.
function mapDispatchToProps(dispatch) {
	return {
		fetchComments: (id) => dispatch(fetchComments(id)),
		toggleStarredStatus: (isStarred, id) => {
			if(isStarred) {
				dispatch(unstarGist(id));
			}
			else {
				dispatch(starGist(id));
			}
		},
		forkGist: (id) => {
			dispatch(checkIfForked(id));
		},
		deleteGist: (id) => {
			if (confirm('Haluatko varmasti poistaa tämän gistin?')) {
				dispatch(deleteGist(id));
			}
		},
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleGist);
