import React, {PropTypes} from 'react';
import GistInfo from '../../../sharedcomponents/GistInfo';
import ReadOnlyGistFile from '../../../sharedcomponents/ReadOnlyGistFile';
import GistFiles from '../../../sharedcomponents/GistFiles';
import Loading from '../../../sharedcomponents/Loading';

function ShowActiveGist(props) {
	const isListLoading = props.isListLoading;
	const {item, isFetching, fetchError} = props.activeGist;

	return (
		<div className='show-active-gist'>
			{!isListLoading && isFetching &&
				<Loading />
			}
			{!isListLoading && !isFetching && !fetchError && item.hasOwnProperty('id') &&
				<div>
					<GistInfo
						gist={props.activeGist}
						userId={props.userId}
						actions={props.actions}
					/>
					<GistFiles files={item.files} />
				</div>
			}
			{fetchError &&
				<div className='error'>
					Gistin lataaminen ei onnistunut.
				</div>
			}
		</div>
	);
}

export default ShowActiveGist;
