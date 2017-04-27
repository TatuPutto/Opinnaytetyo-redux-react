import React from 'react';


function GistActions(props) {
	const {id, isStarred, isForking, starGist, forkGist} = props;
	const starredStatus = isStarred ? 'Poista suosikeista' : 'Lisää suosikkeihin';
	const starIcon = isStarred ? 'fa fa-star-o' : 'fa fa-star';
	const forkingStatus = isForking ? 'Forkataan...' : 'Fork';

	return (
		<span className='actions'>
			<button onClick={() => starGist(isStarred, id)}>
				<i className={starIcon}/> {starredStatus}
			</button>

			<button
				className='fork-gist'
				onClick={() => forkGist(id)}
				disabled={isForking}
			>
				<i className={isForking ?
						'fa fa-spinner fa-spin' : 'fa fa-code-fork'} />
					&nbsp;{forkingStatus}
			</button>
		</span>
	);
}

export default GistActions;
