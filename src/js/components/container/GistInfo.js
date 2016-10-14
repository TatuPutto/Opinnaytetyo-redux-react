import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import GistActions from '../presentational/reusable/GistInfo/GistActions';
import GistActionsOwner from '../presentational/reusable/GistInfo/GistActionsOwner';
	
import { starGist, unstarGist, checkIfForked, deleteGist } 
		from '../../actions/actions';

class GistInfo extends React.Component {
	
	render() {
		const { gist, isCheckingStarredStatus, isStarred, toggleStarredStatus, 
				forkGist, deleteGist, currentUser } = this.props;
		
			return (
				<div className='gistInfo'>
					<span className='owner'>
						<img className='ownerAvatar' 
								src={gist.owner.avatar_url} />
						<a id='viewGist'>{gist.owner.login}</a>
					</span>
					
					
					{gist.owner.login === currentUser &&
						<GistActionsOwner id={gist.id}
								isCheckingStarredStatus={isCheckingStarredStatus}
								isStarred={isStarred} starGist={toggleStarredStatus}
								deleteGist={deleteGist} />
					}
				
					{gist.owner.login !== currentUser &&
						<GistActions id={gist.id}
								isCheckingStarredStatus={isCheckingStarredStatus}
								isStarred={isStarred} starGist={toggleStarredStatus}
								forkGist={forkGist} />
					}
			
					
				<br/>
				<span className='desc'>
					<Link to href={'/gist/' + gist.id}>
						<p>{gist.files[0].filename}</p>
					</Link>
					<br/>
					<p className='description'>{gist.description}</p>
				</span>	
         	</div>
		);
	}
 
}


GistInfo.propTypes = {
	gist: PropTypes.object.isRequired,
	isFetchingSelectedGist: PropTypes.bool.isRequired,
	isStarred: PropTypes.bool.isRequired,
	isCheckingStarredStatus: PropTypes.bool.isRequired,
	currentUser: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		isStarred: state.activeGist.isStarred,
		isCheckingStarredStatus: state.activeGist.isChecking,
		isFetchingSelectedGist: state.activeGist.isFetching,
		currentUser: state.user.userLogin,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toggleStarredStatus: (isStarred, id) => {
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
						
						


