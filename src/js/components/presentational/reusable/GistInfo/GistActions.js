import React from 'react';


class GistActions extends React.Component {
	
	render() {
		const { id, isCheckingStarredStatus, isStarred, 
				starGist, forkGist } = this.props;
		
		const className = isCheckingStarredStatus ? 'pending' : null;
		const value = isStarred ? 'Poista suosikeista' : 'Aseta suosikiksi';
				
		return (
			<span className='actions'>
				<input type='button' id='starGist'
						className={className} value={value}
						onClick={() => starGist(isStarred, id)} />
				
				<input type='button' id='forkGist' value='Fork'
						onClick={() => forkGist(id)} />
			</span>
		);
	}
	
}


export default GistActions;