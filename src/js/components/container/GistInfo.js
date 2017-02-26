import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import GistActions from '../presentational/reusable/GistInfo/GistActions';
import GistActionsOwner from
		'../presentational/reusable/GistInfo/GistActionsOwner';

import {
	starGist,
	unstarGist,
	checkIfForked,
	deleteGist,
} from '../../actions/actions';


class GistInfo extends React.Component {
	render() {
		const {
			id,
			name,
			description,
			isPublic,
			isStarred,
			owner,
		} = this.props.gist;

		return (
			<div className='gist-info'>
				<span className='owner'>
					<img id='owner-avatar' src={owner.avatarUrl} />
					<Link to={'/opinnaytetyo/search/' + owner.login} id='view-gist'>
						{owner.login}
					</Link>
				</span>

				{owner.id === this.props.userId &&
					<GistActionsOwner
						id={id}
						isStarred={isStarred}
						starGist={this.props.toggleStarredStatus}
						deleteGist={this.props.deleteGist}
					/>
				}

				{owner.id !== this.props.userId &&
					<GistActions
						id={id}
						isStarred={isStarred}
						starGist={this.props.toggleStarredStatus}
						forkGist={this.props.forkGist}
					/>
				}

				<div className='active-gist-info'>
					<Link to={'/opinnaytetyo/gist/' + id}>
						<h2 className='active-gist-name'>
							{name}
						</h2>
					</Link>

					<span>
						{isPublic ? 'Julkinen' : 'Salainen'}
					</span>
					<div className='active-gist-description'>
						<p>{description}</p>
					</div>
				</div>
			</div>
		);
	}
}

/*
GistInfo.propTypes = {
	gist: PropTypes.object.isRequired,
	isStarred: PropTypes.bool.isRequired,
	currentUser: PropTypes.string.isRequired,
};*/


function mapStateToProps(state) {
	return {
		gist: state.activeGist,
		userId: Number(state.user.id),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		toggleStarredStatus: (isStarred, id) => {
			if(isStarred) {
				dispatch(unstarGist(id));
			} else {
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
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GistInfo);
