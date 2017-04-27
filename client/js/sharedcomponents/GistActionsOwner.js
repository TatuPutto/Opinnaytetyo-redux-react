import React from 'react';
import {Link} from 'react-router';

function GistActions(props) {
	const {id, isStarred, starGist, deleteGist} = props;
	const starredStatus = isStarred ?
			'Poista suosikeista' : 'Lisää suosikkeihin';
	const starIcon = isStarred ? 'fa fa-star-o' : 'fa fa-star';

	return (
		<span className='actions'>
			<button onClick={() => starGist(isStarred, id)}>
				<i className={starIcon}/> {starredStatus}
			</button>

			<Link to={'/edit/' + id}>
				<button className='edit'>
					<i className='fa fa-edit' /> Muokkaa
				</button>
			</Link>

			<button className='delete-gist' onClick={() => deleteGist(id)}>
				<i className='fa fa-trash'/> Poista
			</button>
		</span>
	);
}

export default GistActions;