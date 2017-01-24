import React from 'react';
import {Link} from 'react-router';

class GistActions extends React.Component {
	render() {
		const {
			id,
			// isCheckingStarredStatus,
			isStarred,
			starGist,
			deleteGist,
		} = this.props;
		const starredStatus = isStarred ?
				'Poista suosikeista' : 'Aseta suosikiksi';
		const starIcon = isStarred ? 'fa fa-star-o' : 'fa fa-star';


		return (
			<span className='actions'>
				{/* <input type='button' id='starGist' value={starredStatus}
						onClick={() => starGist(isStarred, id)} />*/}

				<button onClick={() => starGist(isStarred, id)}>
					<i className={starIcon}/> {starredStatus}
				</button>

				<Link to={'/edit/' + id}>
					<button>
						<i className='fa fa-edit'/> Muokkaa
					</button>
				</Link>

				<button onClick={() => deleteGist(id)}>
					<i className='fa fa-trash'/> Poista
				</button>
			</span>
		);
	}
}

export default GistActions;
