import React from 'react';
import { Link } from 'react-router';

class GistActions extends React.Component {
	
	render() {
		const { id, isCheckingStarredStatus, isStarred, 
				starGist, deleteGist } = this.props;
		
		const className = isCheckingStarredStatus ? 'pending' : null;
		const value = isStarred ? 'Poista suosikeista' : 'Aseta suosikiksi';		
				
		return (
			<span className='actions'>
				<input type='button' id='starGist'
						className={className} value={value}
						onClick={() => starGist(isStarred, id)} />
				
				<Link to={'/edit/' + id}>
					<input type='button' id='editGist' 
							value='Muokkaa' />
				</Link> 
					
				<input type='button' id='deleteGist' value='Poista'
						onClick={() => deleteGist(id)} />
			</span>
		);
	}
	
}


export default GistActions;