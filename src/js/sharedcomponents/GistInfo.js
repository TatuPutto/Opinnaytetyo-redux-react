import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import CreationInfo from './CreationInfo';
import GistActions from './GistActions';
import GistActionsOwner from './GistActionsOwner';


export default function GistInfo(props) {
	const userId = Number(props.userId);
	const {toggleStarredStatus, forkGist, deleteGist} = props;
	const {
		id,
		name,
		description,
		isPublic,
		isStarred,
		owner,
		createdAt,
		updatedAt,
		createdAtUnformatted,
		updatedAtUnformatted,
		forkInfo,
		isForking,
	} = props.gist;


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
								{name}
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

				{owner.id === userId &&
					<GistActionsOwner
						id={id}
						isStarred={isStarred}
						starGist={toggleStarredStatus}
						deleteGist={deleteGist}
					/>
				}

				{owner.id !== userId &&
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
