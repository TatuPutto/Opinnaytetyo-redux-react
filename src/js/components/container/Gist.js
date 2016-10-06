import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import GistInfo from './GistInfo';
import ReadOnlyGistFile from '../presentational/reusable/ReadOnlyGistFile';
import { fetchUserInfo, fetchGists, 
		fetchSelectedGist } from '../../actions/actions';

require('../../../css/Single.css');


class Gist extends React.Component {

	render() {
		const { isFetchingGists, isFetchingSelectedGist, gist } = this.props;
	
		
		if(this.props.isFetchingSelectedGist === true || 
				!gist.hasOwnProperty('id')) {	
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


Gist.propTypes = {
	gist: PropTypes.object.isRequired,
	isFetchingGists: PropTypes.bool.isRequired,
	isFetchingSelectedGist: PropTypes.bool.isRequired
}


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,	
		isFetchingSelectedGist: state.activeGist.isFetching
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchGist: () => {
			dispatch(fetchSelectedGist(gistId))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Gist);