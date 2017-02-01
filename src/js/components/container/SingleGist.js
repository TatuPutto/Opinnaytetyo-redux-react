import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import GistInfo from './GistInfo';
import ReadOnlyGistFile from '../presentational/reusable/ReadOnlyGistFile';
import {
	fetchUserInfo,
	fetchGists,
	fetchSelectedGist
} from '../../actions/actions';

require('../../../css/single.css');


class SingleGist extends React.Component {
	static propTypes = {
		gist: PropTypes.object.isRequired,
		isFetchingSelectedGist: PropTypes.bool.isRequired
	};

	render() {
		const {isFetching, gist} = this.props;


		if(isFetching || !gist.hasOwnProperty('id')) {
			return <div className='loading'></div>;
		} else {
			const files = gist.files.map((file, i) => {
				return (
					<ReadOnlyGistFile
						key={file.filename}
						filename={file.filename}
						value={file.content}
						editorId={'editor' + i}
						isReadOnly={true}
					/>
				);
			});

			return (
				<div className='single'>
					<div className='show-active-gist'>
						<div className='wrapper-single'>
							<GistInfo />
						</div>

						<div className='gist-files'>
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
		isFetching: state.activeGist.isFetching
	};
}

//Määritellään yksittäisen gistin näkymän toiminnot.
function mapDispatchToProps(dispatch) {
	return {
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
		}
	};
}


export default connect(mapStateToProps)(SingleGist);