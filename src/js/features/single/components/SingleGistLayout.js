import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';

import GistInfo from '../../../sharedcomponents/GistInfo';
import GistFiles from '../../../sharedcomponents/GistFiles';
//import Comments from '../../../components/presentational/commentsection/Comments';
import Loading from '../../../sharedcomponents/Loading';


class SingleGistLayout extends React.Component {
	static propTypes = {gist: PropTypes.object.isRequired};

	/*componentDidMount() {
		$('.header-content').addClass('narrow');
	}*/

	componentWillReceiveProps(nextProps) {
		/*if(nextProps.gist.hasOwnProperty('comments')) {
			if(nextProps.gist.comments > 0 && this.props.comments.length === 0) {
				this.props.fetchComments(nextProps.gist.id);
			}
		}*/
	}


	render() {
		const {
			id,
			files,
			isFetching,
			fetchError,
		} = this.props.gist;
		console.log(this.props.gist);

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

export default SingleGistLayout;
