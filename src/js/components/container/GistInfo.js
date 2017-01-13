import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import GistActions from '../presentational/reusable/GistInfo/GistActions';
import GistActionsOwner from 
		'../presentational/reusable/GistInfo/GistActionsOwner';
	
import { starGist, unstarGist, checkIfForked, deleteGist } 
		from '../../actions/actions';

class GistInfo extends React.Component {
	
	render() {
		const { gist, isStarred, toggleStarredStatus, 
				forkGist, deleteGist, userId } = this.props;		
				
			return (
				<div className='gistInfo'>
					<span className='owner'>
						<img className='ownerAvatar' src={gist.owner.avatar_url} />
						<a id='viewGist'>{gist.owner.login}</a>
					</span>
					
					{gist.owner.id === Number(userId) &&
						<GistActionsOwner id={gist.id} isStarred={isStarred}
								starGist={toggleStarredStatus} deleteGist={deleteGist} />
					}
				
					{gist.owner.id !== Number(userId) &&
						<GistActions id={gist.id} isStarred={isStarred} 
								starGist={toggleStarredStatus} forkGist={forkGist} />
					}
			
					
				<br/>
				<span className='desc'>
					<Link to={'/gist/' + gist.id}>
						<p>{gist.files[0].filename}</p>
					</Link>
					<p style={{background: 'yellow', marginLeft: '20px'}}>{gist.public ? 'Julkinen' : 'Salainen'}</p>
					<br/>
					<p className='description'>{gist.description}</p>
				</span>	
         	</div>
		);
	}
 
}


GistInfo.propTypes = {
	gist: PropTypes.object.isRequired,
	isStarred: PropTypes.bool.isRequired,
	currentUser: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		isStarred: state.activeGist.isStarred,
		userId: state.user.id,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toggleStarredStatus: (isStarred, id) => {
			console.log('täällä');
			
			if(isStarred) {
				dispatch(unstarGist(id));
			}
			else {
				dispatch(starGist(id));
			}
		},
		forkGist: (id) => {
			dispatch(checkIfForked(id));
		},
		deleteGist: (id) => {
			if (confirm('Haluatko varmasti poistaa tämän gistin?')) {
				dispatch(deleteGist(id));
			}
		} 
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(GistInfo);
						
						


