import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import CreationInfo from './CreationInfo';
import GistActions from './GistActions';
import GistActionsOwner from './GistActionsOwner';


function GistInfo(props) {
	const userId = Number(props.userId);
	const {
		isStarred,
		isForking,
	} = props.gist;

	const {
		id,
		description,
		files,
		isPublic,
		owner,
		createdAt,
		updatedAt,
		createdAtUnformatted,
		updatedAtUnformatted,
		forkInfo,
	} = props.gist.item;
	const {toggleStarredStatus, forkGist, deleteGist} = props.actions;

	return (
		<div className='gist-info'>
			<div className='active-gist-title'>
				<span className={'owner-avatar'}>
					<img src={owner.avatarUrl} />
				</span>
				<span className='title-wrapper'>
					<span className={'title'}>
						<h2>
							<Link to={'/gist/' + id}>
								{files[0].filename}
							</Link>
						</h2>
					</span>
					<br />
					<CreationInfo
						owner={owner}
						forkInfo={forkInfo}
						createdAt={createdAt}
						updatedAt={updatedAt}
						createdAtUnformatted={createdAtUnformatted}
						updatedAtUnformatted={updatedAtUnformatted}
					/>
				</span>

				{owner.id === userId ?
					<GistActionsOwner
						id={id}
						isStarred={isStarred}
						starGist={toggleStarredStatus}
						deleteGist={deleteGist}
					/>
					:
					<GistActions
						id={id}
						isStarred={isStarred}
						isForking={isForking}
						starGist={toggleStarredStatus}
						forkGist={forkGist}
					/>
				}
			</div>

			{description &&
				<div className='active-gist-description'>
					<p>{description}</p>
				</div>
			}
		</div>
	);
}

export default GistInfo;
