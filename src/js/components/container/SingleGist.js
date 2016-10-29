import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import GistInfo from './GistInfo';
import ReadOnlyGistFile from '../presentational/reusable/ReadOnlyGistFile';
import { fetchUserInfo, fetchGists, 
		fetchSelectedGist } from '../../actions/actions';

require('../../../css/Single.css');


class SingleGist extends React.Component {

	static propTypes = {
		gist: PropTypes.object.isRequired,
		isFetchingSelectedGist: PropTypes.bool.isRequired
	}
	
	render() {
		const { isFetchingSelectedGist, gist } = this.props;
	
		
		if(isFetchingSelectedGist || !gist.hasOwnProperty('id')) {	
			return <div className='loading'></div>; 
		}
		else {
			const files = gist.files.map(function(file, i) { 
				return (
					<ReadOnlyGistFile key={file.filename} 
							filename={file.filename} value={file.content} 
							editorId={'editor' + i} isReadOnly={true} />
				);
			});

			return (
				<div className='gist'>
					<div className='showActiveGist'>
						<GistInfo />
						
						<div className='gistFiles'>
							{files}
						</div>
					</div>
				</div>
	   	 	);
		}
	}
	
}


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,	
		isFetchingSelectedGist: state.activeGist.isFetching
	}
}
/*
function mapDispatchToProps(dispatch) {
	return {
		fetchGist: () => {
			dispatch(fetchSelectedGist(gistId))
		}
	}
}
*/

export default connect(mapStateToProps)(SingleGist);