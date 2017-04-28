import React from 'react';
import {Link} from 'react-router';

function GistListItem(props) {
	let {filename, description} = props;
	const {
		id,
		owner,
		ownerAvatar,
		activeGistId,
		createdAt,
		updatedAt,
		language,
		setActive,
		addFilter,
		color,
		fileCount,
		comments,
	} = props;
	const isActive = activeGistId === id ?
			'single-gist active' : 'single-gist';


	if(description) {
		// Lyhennetään kuvausta, jos kuvaus on yli 150 merkkiä pitkä
		description = (description.length <= 150) ?
				description : description.substring(0, 150) + '...';
	}

	// Palautetaan gistin tietojen pohjalta muodostettu <li>-elementti.
	return (
		<li className={isActive} id={id} onClick={() => setActive(id)}>
			<div className='content-wrapper'>
				<div className='block-level'>
					<span className={'owner-avatar'}>
						<img src={ownerAvatar} />
					</span>
					<span className='title-wrapper'>
						<span className={'title'}>
							<h2>
								<Link to={'/gist/' + id}>
									{filename}
								</Link>
							</h2>
						</span>
						<br />
						<span className={'creation-info'}>
							<Link to={'/search/' + owner}>
								{owner}
							</Link>
							{createdAt == updatedAt ?
								<span>&nbsp;&bull; created {createdAt}</span>
								:
								<span>&nbsp;&bull; updated {updatedAt}</span>
							}
						</span>
					</span>
				</div>
				<div className='description'>
					{description}
				</div>
				<span className='file-count'>
					<i className='fa fa-file-code-o' /> {fileCount}
				</span>
				<span className='comments-amount'>
					<i className='fa fa-comments-o' /> {comments}
				</span>
				{language &&
					<span
						className='language'
						onClick={() => addFilter(language)}
						style={{backgroundColor: color}}
					>
						<i className='fa fa-tag' /> {language}
					</span>
				}
			</div>
		</li>
	);
}

export default GistListItem;
