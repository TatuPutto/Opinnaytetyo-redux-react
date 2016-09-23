import React from 'react';
import { Link } from 'react-router';


class GistInfo extends React.Component {
	
	render() {
		const { isCheckingStarredStatus, isStarred, starGist, deleteGist,
				visible, owner, ownerAvatarUrl,
				id, name, description } = this.props;
	
				console.log(isStarred +  isCheckingStarredStatus);
				
		if(visible === true) {
			
			return (
				<div className='gistInfo'>
					<span className='title'>
						<img className='ownerAvatar' src={ownerAvatarUrl} />
						<a id='viewGist'>{owner}</a>
					</span>
					
					<span className='actions'>
						<input type='button' id='starGist'
							className={isCheckingStarredStatus ? 
									'pending' : null}
							value={isStarred ? 
									'Poista suosikeista' : 'Aseta suosikiksi'}
							onClick={() => starGist(isStarred, id)}>
						</input>
					
						<Link to={'/edit/' + id}>
							<input type='button' id='editGist' value='Muokkaa'/>
						</Link> 
						
						<input type='button' id='deleteGist' value='Poista'
							onClick={() => deleteGist(id)}>
						</input>
						
					</span>
					
					<br/>
					<span className='desc'>
						<a href={'/gist/' + id}>{name}</a>
						<p className='description'>{description}</p>
					</span>	
	         	</div>
			);
		}
		else {   
			return (
				<div>
					<div className='gistInfo anchor'></div>
					<div className='gistInfo fixed'>
						<span className='title'>
							<img className='ownerAvatar' src={ownerAvatarUrl} />
							<a id='viewGist'>{owner + ' / '}{name}</a>
						</span>
						
						<span className='actions'>
							<Link to={'/edit/' + id}>
								<input type='button' id='editGist' value='Muokkaa'/>
							</Link> 
							<Link to={'/delete/' + id}>
								<input type='button' id='deleteGist' value='Poista'/>
							</Link> 
						</span>
		         	</div>
	         	</div>
			);	
		}
						
	}
 
}


export default GistInfo;
